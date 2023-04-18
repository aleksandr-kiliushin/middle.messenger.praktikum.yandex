import { EventBus } from "."

let eventBus: EventBus<{ logAge: { age: number } }>
beforeEach(() => {
  eventBus = new EventBus()
})

describe("EventBus", () => {
  test("registered events listeners are called with appropriate arguments", () => {
    const eventListener = jest.fn()
    eventBus.registerEventListener({ eventName: "logAge", eventListener })
    eventBus.emitEvent({ eventName: "logAge", eventListenerParams: { age: 42 } })
    expect(eventListener).toHaveBeenCalledTimes(1)
    expect(eventListener).toHaveBeenCalledWith({ age: 42 })
  })

  test("if event listener is not registered, it is not called", () => {
    const eventListener = jest.fn()
    const emitNotRegisteredEvent = () => {
      eventBus.emitEvent({ eventName: "logAge", eventListenerParams: { age: 42 } })
    }
    expect(emitNotRegisteredEvent).toThrowError('There is no "logAge" event registered.')
    expect(eventListener).not.toHaveBeenCalled()
  })
})
