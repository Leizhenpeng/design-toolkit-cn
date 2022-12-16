import { execSync } from 'child_process'
import fs, { access } from 'fs-extra'
import { log, r } from './common'

// check if node_modules target package exists
export const checkNodeModules = async (target: string) => {
  const path = r('node_modules', target)
  await access(path).catch(() => {
    log('kiss', `node_modules/${target} not found, installing...`)
    execSync(`pnpm add ${target} -D`, { stdio: 'inherit' })
  })
}

export const checkPluginTypes = async () => {
  const pluginTypes = [
    '@figma/plugin-typings',
    '@mastergo/plugin-typings',
    '@jsdesigndeveloper/plugin-typings',
  ]
  for (const type of pluginTypes)
    await checkNodeModules(type)
}

const checkClientTypesDir = async () => {
  const path = r('types', 'client')
  await access(path).catch(() => {
    log('kiss', 'types/client not found, creating...')
    fs.mkdirSync(path)
  })
}

const genTypeMasterGo = async () => {
  const mgPath = r('node_modules', '@mastergo/plugin-typings/dist/index.d.ts')
  const content = await fs.readFile(mgPath, 'utf-8')
  const newContent = content.replace(
    'declare global {',
    'export declare namespace masterGoClinet {')
  await fs.writeFile(
    r('types/client', 'masterGo.d.ts'), newContent, 'utf-8')
}

const genTypeFigma = async () => {
  const figmaPath = r('node_modules', '@figma/plugin-typings/plugin-api.d.ts')
  const content = await fs.readFile(figmaPath, 'utf-8')
  const newContent = `export declare namespace figmaClient {\n${content}\n}`
  await fs.writeFile(
    r('types', 'client', 'figma.d.ts'), newContent, 'utf-8')
}

const genTypeJsDesign = async () => {
  const jsDesignPath = r('node_modules', '@jsdesigndeveloper/plugin-typings/plugin-api.d.ts')
  const content = await fs.readFile(jsDesignPath, 'utf-8')
  const newContent = `export declare namespace jsDesignClient {\n${content}\n}`
  await fs.writeFile(
    r('types', 'client', 'jsDesign.d.ts'), newContent, 'utf-8')
}

checkPluginTypes().then(() => {
  checkClientTypesDir()
}).then(() => {
  genTypeMasterGo()
  genTypeFigma()
  genTypeJsDesign()
})

