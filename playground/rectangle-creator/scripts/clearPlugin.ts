import clientNow from './clientParse'
import { r } from './utils'
import rimraf from 'rimraf'

const nowPluginPath = r(`plugin/${clientNow}/**`)
rimraf.sync(nowPluginPath)
