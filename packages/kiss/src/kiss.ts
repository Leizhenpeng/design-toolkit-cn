import type { Platform } from '~/types'
import { UiClientEnum } from '~/types'
import { Detect_platform } from '~/utils/detect_platform'

export class Kiss {
  platform: Platform = 'unknown'
  ui_client: UiClientEnum = UiClientEnum.unknown
  private _client: PluginAPI | any
  constructor() {
    this.parsePlatForm()
    this.initClient()
  }

  get client() {
    return this._client
  }

  parsePlatForm() {
    const detect = new Detect_platform()
    this.platform = detect.platform as Platform
    this.ui_client = detect.ui_client
    if (detect.if_unknown_platform)
      throw new Error('unknown platform,only support figma,mg,jsDesign')
  }

  initClient() {
    switch (this.platform) {
      case 'figma':
        this._client = figma
        break
      case 'mg':
        this._client = mg
        break
      case 'jsDesign':
        this._client = jsDesign
        break
      case 'ui':
        this._client = {}
        break
    }
  }

  get inUi() {
    return this.platform === 'ui'
  }

  get inMg() {
    return this.platform === 'mg'
  }

  get inMgUi() {
    return this.ui_client === UiClientEnum.mg
  }

  get uiClient() {
    return this.ui_client
  }

  showUI(args: any) {
    if (this.inUi)
      return
    this._client.showUI(args as any)
  }
}
