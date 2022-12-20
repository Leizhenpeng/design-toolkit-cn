import { exec } from 'child_process'
import chokidar from 'chokidar'
import { debounce, delay } from 'lodash-es'
import { r } from './utils'
import clientNow from './clientParse'

const appScriptPath = r(`scripts/appScript/${clientNow}.applescript.sh`)
console.log('appScriptPath', appScriptPath)
const restartPlugin = debounce(() => {
  exec(`sh ${appScriptPath}`)
}, 1000)

// CLIENT_SHOW
const ifRestart = process.env.CLIENT_SHOW === 'true'

delay(() => {
  ifRestart && chokidar
    .watch([r(`plugin/${clientNow}/**`)])
    .on('change', restartPlugin)
    .on('add', restartPlugin)
    .on('addDir', restartPlugin)
}, 3000)
