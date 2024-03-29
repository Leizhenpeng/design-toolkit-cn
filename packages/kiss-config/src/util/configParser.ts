import { clientParse } from './clientParse'
import { AbstractHandler } from './abstractHandler'

const clientNow = clientParse.value

class NameHandlerMeta extends AbstractHandler {
  public handle(pkg: any): string {
    if (pkg && pkg.pluginInfo && pkg.pluginInfo.name) {
      const namePool = pkg.pluginInfo.name
      const name = namePool[clientNow]
      if (name)
        return name
    }
    return super.handle(pkg)
  }
}

export class NameHandlerDefault extends AbstractHandler {
  public handle(pkg: any): string {
    return pkg.name
  }
}

export const nameHandler = new NameHandlerMeta()
nameHandler.setNext(new NameHandlerDefault())

class ApiHandlerMeta extends AbstractHandler {
  public handle(pkg: any): string {
    if (pkg && pkg.pluginInfo && pkg.pluginInfo.api)
      return pkg.pluginInfo.api

    return super.handle(pkg)
  }
}

class ApiHandlerDefault extends AbstractHandler {
  public handle(pkg: any): string {
    return pkg.version
  }
}




export const apiHandler = new ApiHandlerMeta()
apiHandler.setNext(new ApiHandlerDefault())

class IdHandlerMeta extends AbstractHandler {
  public handle(pkg: any): string {
    if (pkg && pkg.pluginInfo && pkg.pluginInfo.id) {
      const idPool = pkg.pluginInfo.id
      const id = idPool[clientNow]
      if (id)
        return id
    }
    return super.handle(pkg)
  }
}

class IdHandlerDefault extends AbstractHandler {
  public handle(): string {
    return Date.now().toString()
  }
}

export const idHandler = new IdHandlerMeta()
idHandler.setNext(new IdHandlerDefault())

class EditorTypeHandlerMeta extends AbstractHandler {
  public handle(pkg: any): string[] {
    if (pkg && pkg.pluginInfo && pkg.pluginInfo.editorType) {
      const editorTypePool = pkg.pluginInfo.editorType
      const editorType = editorTypePool[clientNow]
      if (editorType)
        return editorType
    }
    return super.handle(pkg)
  }
}

class EditorTypeHandlerDefault extends AbstractHandler {
  public handle(): any {
    return [clientNow]
  }
}

export const editorTypeHandler = new EditorTypeHandlerMeta()
editorTypeHandler.setNext(new EditorTypeHandlerDefault())

class CustomHandleMeta extends AbstractHandler {
  public handle(pkg: any): any {
    if (pkg && pkg.pluginInfo && pkg.pluginInfo.custom) {
      const customPool = pkg.pluginInfo.custom
      const custom = customPool[clientNow]
      if (custom)
        return custom
    }
    return super.handle(pkg)
  }
}

class CustomHandleDefault extends AbstractHandler {
  public handle(): any {
    return {}
  }
}

export const customHandler = new CustomHandleMeta()
customHandler.setNext(new CustomHandleDefault())