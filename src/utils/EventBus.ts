/* eslint-disable @typescript-eslint/no-explicit-any */
export class EventBus<TEventName extends string> {
  private eventsHandlersByEventName: Partial<Record<TEventName, ((params: unknown) => void)[]>>

  constructor() {
    this.eventsHandlersByEventName = {}
  }

  public registerEventListener({ eventListener, eventName }: { eventName: TEventName; eventListener: (params: any) => void }) {
    if (this.eventsHandlersByEventName[eventName] === undefined) {
      this.eventsHandlersByEventName[eventName] = []
    }
    this.eventsHandlersByEventName[eventName]?.push(eventListener)
  }

  public removeEventListener({ eventListener, eventName }: { eventName: TEventName; eventListener: () => void }) {
    const eventsListeners = this.eventsHandlersByEventName[eventName]

    if (eventsListeners === undefined) {
      throw new Error(`There is no "${eventName}" event.`)
    }

    eventsListeners.push(eventListener)
  }

  public emitEvent({ eventListenerArguments, eventName }: { eventListenerArguments?: unknown; eventName: TEventName }) {
    const eventsListeners = this.eventsHandlersByEventName[eventName]

    if (eventsListeners === undefined) {
      throw new Error(`There is no "${eventName}" event.`)
    }

    eventsListeners.forEach((eventListener) => {
      eventListener(eventListenerArguments)
    })
  }
}
