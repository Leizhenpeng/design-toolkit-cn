/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import { cyan, green, magenta, red, reset, yellow } from 'kolorist'
import prompts from 'prompts'
import banner from './util/banner'
import { copy, editFile, emptyDir, formatTargetDir, isEmpty } from './util/file'
import { isValidPackageName, toValidPackageName } from './util/packageName'

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), {
  string: ['_'],
  alias: {
    t: 'template',
    ui: 'framework',
    wasm: 'wasmtool',
  },
})
const cwd = process.cwd()
// possible options:
// --default
// --framework (vue, react, svelte) / --ui
// --wasmtool (rust, ts) / --wasm
// --menu
// --with-tests / --tests (equals to `--vitest --cypress`)
// --force (for force overwriting)
// if any of the feature flags is set, we would skip the feature prompts

// if any of the feature flags is set, we would skip the feature prompts
const isFeatureFlagsUsed = typeof (argv.default ?? argv.framework ?? argv.wasmtool ?? argv.menu ?? argv.withTests) === 'string'

console.log('isFeatureFlagsUsed', isFeatureFlagsUsed)
type ColorFunc = (str: string | number) => string
interface Framework {
  name: string
  display: string
  color: ColorFunc
}

interface WasmTool {
  name: string
  display: string
  color: ColorFunc
  describe: string
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
  },
  {
    name: 'svelte',
    display: 'Svelte',
    color: red,
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
  },
  {
    name: 'preact',
    display: 'Preact',
    color: magenta,
  },
  {
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
  },
]

const WASMTOOLS: WasmTool[] = [
  {
    name: 'rust',
    display: 'rust-wasm',
    color: yellow,
    describe: 'Using Rust and WebAssembly together',
  },
  {
    name: 'ts',
    display: 'assemblyScript',
    color: green,
    describe: 'A TypeScript-like language for WebAssembly',
  },
]

const TEMPLATES = FRAMEWORKS.map(f => [f.name]).reduce((a, b) => a.concat(b), [])

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

const defaultTargetDir = 'kiss-plugin'

async function init() {
  console.log(banner())

  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || defaultTargetDir
  const getPluginName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir)

  let result: prompts.Answers<'pluginName' | 'overwrite' | 'packageName' | 'needsUI' | 'framework' | 'needsWasm' | 'wasmtool' | 'needsMenu'>

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'pluginName',
          message: reset('Plugin name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm'),
          name: 'overwrite',
          message: () =>
            `${targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false)
              throw new Error(`${red('✖')} Operation cancelled`)

            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(getPluginName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getPluginName()),
          validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          name: 'needsUI',
          type: () => {
            return isFeatureFlagsUsed ? null : 'toggle'
          },
          message: reset('Need UI?'),
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          type: (prev, values) => {
            if (values.needsUI === false)
              return null
            return argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select'
          },
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
        {
          name: 'needsWasm',
          type: () => {
            return isFeatureFlagsUsed ? null : 'toggle'
          },
          message: reset('Need WebAssembly?'),
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          type: (prev, values) => {
            if (values.needsWasm === false)
              return null
            return isFeatureFlagsUsed ? null : 'select'
          },
          name: 'wasmtool',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid wasm tool. Please choose from below: `)
              : reset('Select a wasm tool:'),
          initial: 0,
          choices: WASMTOOLS.map((wasmtool) => {
            const frameworkColor = wasmtool.color
            return {
              title: frameworkColor(wasmtool.display || wasmtool.name),
              value: wasmtool,
              description: wasmtool.describe,
            }
          }),
        },
        {
          name: 'needsMenu',
          type: () => {
            return isFeatureFlagsUsed ? null : 'toggle'
          },
          message: reset('Need Menu?'),
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      },
    )
  }
  catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName } = result

  const root = path.join(cwd, targetDir)

  if (overwrite)
    emptyDir(root)
  else if (!fs.existsSync(root))
    fs.mkdirSync(root, { recursive: true })

  // determine template
  let template: string = framework?.name || argTemplate
  let isReactSwc = false
  if (template.includes('-swc')) {
    isReactSwc = true
    template = template.replace('-swc', '')
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`)

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content)
      fs.writeFileSync(targetPath, content)
    else copy(path.join(templateDir, file), targetPath)
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(f => f !== 'package.json')) write(file)

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8'))

  pkg.name = packageName || getPluginName()

  write('package.json', JSON.stringify(pkg, null, 2))

  if (isReactSwc)
    setupReactSwc(root, template.endsWith('-ts'))

  console.log('\nDone. Now run:\n')
  if (root !== cwd)
    console.log(`  cd ${path.relative(cwd, root)}`)

  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent)
    return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

function setupReactSwc(root: string, isTs: boolean) {
  editFile(path.resolve(root, 'package.json'), (content) => {
    return content.replace(/"@vitejs\/plugin-react": ".+?"/, '"@vitejs/plugin-react-swc": "^3.0.0"')
  })
  editFile(path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`), (content) => {
    return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc')
  })
}

init().catch((e) => {
  console.error(e)
})
