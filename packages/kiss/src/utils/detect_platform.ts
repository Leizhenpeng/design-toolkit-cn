import { UiClientEnum } from '~/types'

/**
import { UiClientEnum } from '~/types';
 * @name: detect_platform.ts
 * @author: river
 * @date: 2022/12/3 7:17 PM
 * @contact: laolei@forkway.cn
 * @description：检测当前平台
 */
export class Detect_platform {
  platform = 'unknown'
  constructor() {
    this.platform = this.parse_platform()
  }

  get if_unknown_platform() {
    return this.platform === 'unknown'
  }

  if_ui() {
    // windows if exist
    // console.log('window', location.ancestorOrigins[0])
    let result = false
    try {
      if (window)
        result = true
    }
    catch (e) {
      result = false
    }
    return result
  }

  if_js_design() {
    let result = false
    try {
      if (jsDesign)
        result = true
    }
    catch (e) {
      result = false
    }
    return result
  }

  if_figma() {
    let result = false
    try {
      if (figma)
        result = true
    }
    catch (e) {
      result = false
    }
    return result
  }

  if_mg() {
    let result = false
    try {
      if (mg)
        result = true
    }
    catch (e) {
      result = false
    }
    return result
  }

  get host() {
    if (!this.parse_platform().match(/ui/))
      return ''
    return location.ancestorOrigins[0] ?? ''
  }

  get ui_client() {
    if (!this.if_ui())
      return UiClientEnum.unknown
    else if (this.host.match(/mastergo\.com/))
      return UiClientEnum.mg
    else if (this.host.match(/figma\.com/))
      return UiClientEnum.figma
    else if (this.host.match(/js\.design/))
      return UiClientEnum.jsDesign
    else
      return UiClientEnum.unknown
  }

  parse_platform() {
    let result
    if (this.if_mg())
      result = 'mg'
    else if (this.if_js_design())
      result = 'jsDesign'
    else if (this.if_figma())
      result = 'figma'
    else if (this.if_ui())
      result = 'ui'
    else
      result = 'unknown'
    return result
  }
}
