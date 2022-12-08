import type { Platform } from '~/types'
import { Detect_platform } from '~/utils/detect_platform'

export class Kiss {
  platform: Platform = 'unknown'
  private client: PluginAPI
  constructor() {
    this.parsePlatForm()
    this.initClient()
  }

  parsePlatForm() {
    const detect = new Detect_platform()
    this.platform = detect.platform as Platform
    // if (detect.if_unknown_platform)
    //   throw new Error('unknown platform,only support figma,mg,jsDesign')
  }

  initClient() {
    switch (this.platform) {
      case 'figma':
        this.client = figma
        break
      case 'mg':
        this.client = mg
        break
      case 'jsDesign':
        this.client = jsDesign
        break
    }
  }

  showUI(args: any) {
    this.client.showUI(args as any)
  }
}
