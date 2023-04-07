import Handlebars from "handlebars"
import { nanoid } from "nanoid"

import { EventBus } from "./EventBus"

type TEventsListeners = Partial<Record<keyof HTMLElementEventMap, (event: Event) => void>>

export type TBlockBaseProps = Partial<{
  eventsListeners: TEventsListeners
  [key: string]: unknown
}>

export abstract class Block<TProps extends TBlockBaseProps = Record<string, never>> {
  protected element: HTMLElement | null
  private blockId: string
  private eventBus: EventBus<"COMPONENT_DID_MOUNT" | "COMPONENT_DID_UPDATE" | "INITIALIZE" | "RERENDER">
  private eventsListeners: TEventsListeners
  public props: TProps

  constructor(protected template: string, props: TProps) {
    this.blockId = nanoid(4)
    this.element = null
    this.props = this.makePropsProxy(props)
    this.eventsListeners = this.makeEventsListenersBound({ eventsListeners: props.eventsListeners })

    this.eventBus = new EventBus()

    this.eventBus.registerEventListener({ eventName: "INITIALIZE", eventListener: this.initialize.bind(this) })
    this.eventBus.registerEventListener({ eventName: "COMPONENT_DID_MOUNT", eventListener: this.componentDidMount.bind(this) })
    this.eventBus.registerEventListener({ eventName: "COMPONENT_DID_UPDATE", eventListener: this.componentDidUpdate.bind(this) })
    this.eventBus.registerEventListener({ eventName: "RERENDER", eventListener: this.rerender.bind(this) })

    this.eventBus.emitEvent({ eventName: "INITIALIZE" })
  }

  private initialize = () => {
    this.element = this.generateHtmlElement()
    document.addEventListener("DOMContentLoaded", () => {
      this.hangEventsListeners()
      this.eventBus.emitEvent({ eventName: "COMPONENT_DID_MOUNT" })
    })
  }

  private generateHtmlElement(): HTMLElement {
    const container = document.createElement("template")
    container.innerHTML = Handlebars.compile(this.template)(this.props).trim()
    const element = container.content.firstChild
    if (!(element instanceof HTMLElement)) {
      throw new Error("`element` is not an HTMLElement instance.")
    }
    element.setAttribute("block-id", this.blockId)
    return element
  }

  private makeEventsListenersBound = ({
    eventsListeners,
  }: {
    eventsListeners: TEventsListeners | undefined
  }): TEventsListeners => {
    if (eventsListeners === undefined) return {}
    const result: TEventsListeners = {}
    for (const eventName in eventsListeners) {
      const _eventName = eventName as keyof HTMLElementEventMap
      const eventListener = eventsListeners[_eventName]
      if (eventListener === undefined) continue
      result[_eventName] = eventListener.bind(this)
    }
    return result
  }

  private hangEventsListeners = () => {
    for (const eventName in this.eventsListeners) {
      const eventListener = this.eventsListeners[eventName as keyof HTMLElementEventMap]
      if (eventListener === undefined) continue
      this.elementOnPage.addEventListener(eventName, eventListener)
    }
  }

  private removeEventsListeners = () => {
    for (const eventName in this.eventsListeners) {
      const eventListener = this.eventsListeners[eventName as keyof HTMLElementEventMap]
      if (eventListener === undefined) continue
      this.elementOnPage.removeEventListener(eventName, eventListener)
    }
  }

  private makePropsProxy = (props: TProps): TProps => {
    return new Proxy(props, {
      set: (previousProps: TProps, propName, value: TProps[keyof TProps]) => {
        this.props = { ...previousProps, [propName]: value }
        this.eventBus.emitEvent({ eventName: "COMPONENT_DID_UPDATE" })
        this.eventBus.emitEvent({ eventName: "RERENDER" })
        return true
      },
    })
  }

  public get markup() {
    if (this.element === null) return ""
    return this.element.outerHTML
  }

  private get elementOnPage() {
    const element = document.querySelector(`[block-id="${this.blockId}"]`)
    if (!(element instanceof HTMLElement)) {
      throw new Error("Block is not found in the web page.")
    }
    return element
  }

  private rerender() {
    this.removeEventsListeners()
    this.props = this.makePropsProxy(this.props)
    this.element = this.generateHtmlElement()
    this.elementOnPage.outerHTML = this.markup
    this.hangEventsListeners()
  }

  protected componentDidMount() {}

  protected componentDidUpdate() {}
}
