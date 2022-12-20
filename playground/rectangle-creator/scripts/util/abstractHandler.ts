interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string;
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler

  public setNext (handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  public handle (request: string): any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return ''
  }
}
