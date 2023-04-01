/* eslint-disable no-console */
import { createUnplugin } from 'unplugin'
import fs, { access, mkdir } from 'fs-extra'
import type PkgType from '../package.json'
import type { Options } from './types'

import { log, r } from './util/logger'
import { setClient } from './util/clientParse'
import { apiHandler, customHandler, editorTypeHandler, idHandler, nameHandler } from './util/configParser'

export async function genManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType
  const customManifest = customHandler.handle(pkg)
  const manifest = {
    name: nameHandler.handle(pkg),
    id: idHandler.handle(pkg),
    api: apiHandler.handle(pkg),
    main: 'code/index.js',
    ui: 'ui/index.html',
    editorType: editorTypeHandler.handle(pkg) as any,
    ...customManifest,
  }
  return manifest
}

export async function writeManifest(outDir: string, clientName = 'figma') {
  const clientPath = r(`${outDir}/${clientName}`)
  const manifestPath = r(`${outDir}/${clientName}/manifest.json`)

  await access(r(outDir)).catch(() => mkdir(r(outDir)))
  await access(clientPath).catch(() => mkdir(clientPath))
  console.log('manifestPath', manifestPath)
  await fs.writeJSON(manifestPath, await genManifest(), { spaces: 2 })
  log('manifest', 'update manifest.json')
}

export default createUnplugin<Options>(options => ({
  name: 'unplugin-kiss-config',
  buildStart(): void {
    const outDir = options.outDir || 'plugin'
    const clientName = options.client || 'figma'
    setClient(clientName)
    writeManifest(outDir, clientName)
  },
}))
