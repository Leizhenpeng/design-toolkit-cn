// test add
import type { IClient } from './types'
import { Kiss } from '~/kiss'

const kiss = new Kiss()
const _client = kiss.inUi ? {} : kiss.client as any
const client = Object.create(_client) as IClient

// client.prototype = client

client.mg = kiss.inMg ? mg : _client as any
client.figma = kiss.inFigma ? figma : _client as any
client.jsDesign = kiss.inJsDesign ? jsDesign : _client as any

const env = {
  platform: kiss.platform,
  ui_client: kiss.ui_client,
  inUi: kiss.inUi,
  inMgUi: kiss.inMgUi,
  inMg: kiss.inMg,
  uiClient: kiss.uiClient,
}
export {
  kiss,
  client,
  env,
}
