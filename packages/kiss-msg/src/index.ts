import { EventEmitter } from 'eventemitter3'
import { client, kiss } from 'kiss-core'

export interface MsgDto {
  msg: string
  data: any
}

export class MyEvent extends EventEmitter {
  ifUI: boolean
  ifMg: boolean
  ifMgUi: boolean

  constructor(
    ifRenderUI = false,
    ifMg = false,
    ifMgUi = false,
  ) {
    super()
    this.ifUI = ifRenderUI
    this.ifMg = ifMg
    this.ifMgUi = ifMgUi
    this.init()
  }

  init() {
    const receive = (result: any) => {
      if (result && result.event) {
        // console.log('result.event', result.event)
        // console.log('result.data', result.data)
        this.emit(result.event, result.data)
      }
    }

    if (this.ifUI) {
      if (this.ifMgUi) {
        try {
          window.onmessage = ev => receive(ev.data)
        }
        catch (e) {
          //   console.log('err', e)
        }
      }
      else {
        window.onmessage = ev => receive(ev.data.pluginMessage)
      }
    }
    else {
      client.ui.onmessage = (data: any) => {
        // console.log('data', data)
        receive(data)
      }
    }
  }

  send(event: any, data: any = '') {
    if (typeof event !== 'string')
      throw new Error('Expected first argument to be an event name string')

    const postData = {
      event,
      data,
    }
    if (this.ifUI) {
      if (this.ifMgUi) {
        try {
          window.parent.postMessage(postData, '*')
        }
        catch (e) {
          //   console.log('err', e)
        }
      }
      else {
        parent.postMessage({ pluginMessage: postData }, '*')
      }
    }
    else {
      client.ui.postMessage(postData)
    }
  }

  // type support
  answer<T extends MsgDto>(event: T['msg'], handler: (data: T['data']) => void): this {
    return super.on(event, handler)
  }

  query<T extends MsgDto>(event: T['msg'], data: T['data']) {
    this.send(event, data)
  }
}

// console.log(kiss, kiss.inUi, kiss.inMgUi)
export const io_ui = kiss.inUi ? new MyEvent(true, kiss.inMg, kiss.inMgUi) : undefined
export const io_hook = kiss.inUi ? undefined : new MyEvent(false, kiss.inMg, kiss.inMgUi)
