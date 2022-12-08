/**
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

  if_js_design() {
    let result = false
    try {
      if (jsDesign)
        result = true
    }
    catch {
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
    catch {
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
    catch {
      result = false
    }
    return result
  }

  parse_platform() {
    let result
    if (this.if_mg())
      result = 'mg'
    else if (this.if_js_design())
      result = 'jsDesign'
    else if (this.if_figma())
      result = 'figma'
    else
      result = 'unknown'
    return result
  }
}
