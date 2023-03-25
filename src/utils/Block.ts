import { nanoid } from "nanoid"
import Handlebars from "handlebars"
import { EventBus } from "./EventBus"

export type TBlockBaseProps = Partial<{
  eventsListeners: Partial<Record<keyof HTMLElementEventMap, (event: Event) => void>>
  [key: string]: unknown
}>

export abstract class Block<TProps extends TBlockBaseProps = Record<string, never>> {
  protected element: HTMLElement | null
  private blockId: string
  private eventBus: EventBus<"COMPONENT_DID_UPDATE" | "INITIALIZE" | "RERENDER">
  public props: TProps

  constructor(protected template: string, props: TProps) {
    this.blockId = nanoid(4)
    this.element = null
    this.props = this.makePropsProxy(props)

    this.eventBus = new EventBus()

    this.eventBus.registerEventListener({
      eventListener: this.initialize.bind(this),
      eventName: "INITIALIZE",
    })
    this.eventBus.registerEventListener({
      eventListener: this.componentDidUpdate.bind(this),
      eventName: "COMPONENT_DID_UPDATE",
    })
    this.eventBus.registerEventListener({
      eventListener: this.rerender.bind(this),
      eventName: "RERENDER",
    })

    this.eventBus.emitEvent({ eventName: "INITIALIZE" })
  }

  private initialize = () => {
    this.element = this.generateHtmlElement()
    document.addEventListener("DOMContentLoaded", this.hangEventsListeners)
  }

  private componentDidUpdate() {
    this.eventBus.emitEvent({ eventName: "RERENDER" })
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

  private hangEventsListeners = () => {
    if (this.props.eventsListeners === undefined) return

    for (const eventName in this.props.eventsListeners) {
      const eventListener = this.props.eventsListeners[eventName as keyof HTMLElementEventMap]
      if (eventListener === undefined) continue
      this.elementOnPage.addEventListener(eventName, eventListener.bind(this))
    }
  }

  private makePropsProxy = (props: TProps): TProps => {
    return new Proxy(props, {
      set: (previousProps: TProps, propName, value: TProps[keyof TProps]) => {
        this.props = {
          ...previousProps,
          [propName]: value,
        }

        this.eventBus.emitEvent({
          eventName: "COMPONENT_DID_UPDATE",
        })
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
    this.props = this.makePropsProxy(this.props)
    this.element = this.generateHtmlElement()
    this.elementOnPage.outerHTML = this.markup
    this.hangEventsListeners()
  }
}
