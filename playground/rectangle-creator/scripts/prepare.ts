import { execSync } from 'child_process'
import chokidar from 'chokidar'
import { r, isDev } from './utils'

function writeManifest () {
  execSync('npx esno ./scripts/manifest.ts', { stdio: 'inherit' })
}

writeManifest()

if (isDev) {
  chokidar.watch([r('src/manifest.ts'), r('package.json')])
    .on('change', () => {
      writeManifest()
    })
}
