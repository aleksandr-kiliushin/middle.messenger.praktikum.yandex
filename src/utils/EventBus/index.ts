export class EventBus<TEventParamsByEventName extends Record<string, unknown>> {
  private eventsHandlersByEventName: {
    [TEventName in keyof TEventParamsByEventName]?: ((params: TEventParamsByEventName[TEventName]) => void)[]
  }

  constructor() {
    this.eventsHandlersByEventName = {}
  }

  public registerEventListener<TEventName extends keyof TEventParamsByEventName>({
    eventListener,
    eventName,
  }: {
    eventName: TEventName
    eventListener: (params: TEventParamsByEventName[TEventName]) => void
  }) {
    if (this.eventsHandlersByEventName[eventName] === undefined) {
      this.eventsHandlersByEventName[eventName] = []
    }
    this.eventsHandlersByEventName[eventName]?.push(eventListener)
  }

  public removeEventListener<TEventName extends keyof TEventParamsByEventName>({
    eventListener,
    eventName,
  }: {
    eventName: TEventName
    eventListener: (params: TEventParamsByEventName[TEventName]) => void
  }) {
    const eventsListeners = this.eventsHandlersByEventName[eventName]

    if (eventsListeners === undefined) {
      throw new Error(`There is no "${String(eventName)}" event registered.`)
    }

    eventsListeners.push(eventListener)
  }

  public emitEvent<TEventName extends keyof TEventParamsByEventName>({
    eventListenerParams,
    eventName,
  }: {
    eventListenerParams: TEventParamsByEventName[TEventName]
    eventName: TEventName
  }) {
    const eventsListeners = this.eventsHandlersByEventName[eventName]

    if (eventsListeners === undefined) {
      throw new Error(`There is no "${String(eventName)}" event registered.`)
    }

    eventsListeners.forEach((eventListener) => {
      eventListener(eventListenerParams)
    })
  }
}
