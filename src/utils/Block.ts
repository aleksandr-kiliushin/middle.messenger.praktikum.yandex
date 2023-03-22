import { nanoid } from "nanoid"
import Handlebars from "handlebars"
import { EventBus } from "./EventBus"

export type TBlockBaseProps = {
  eventsListeners?: Partial<Record<keyof HTMLElementEventMap, () => void>>
}

export abstract class Block<TProps extends TBlockBaseProps> {
  protected element: HTMLElement | null
  private blockId: string
  private eventBus: EventBus<"COMPONENT_DID_UPDATE" | "INITIALIZE" | "RERENDER">
  public props: TProps

  constructor(props: TProps, protected template: string) {
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
    this.createElement()
    if (this.element === null) throw new Error("`this.element` is null.")

    this.element.setAttribute("block-id", this.blockId)

    // private hangListeners() {}
    // document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const block = document.querySelector(`[block-id="${this.blockId}"]`)
      if (block === null) return

      for (const eventName in this.props.eventsListeners) {
        const eventListener = this.props.eventsListeners[eventName as keyof HTMLElementEventMap]
        if (eventListener === undefined) continue
        block.addEventListener(eventName, eventListener.bind(this))
      }
    }, 0)
    // })
  }

  private componentDidUpdate() {
    console.log("Block's componentDidUpdate is called.")
    this.eventBus.emitEvent({ eventName: "RERENDER" })
  }

  private createElement() {
    const container = document.createElement("template")
    container.innerHTML = Handlebars.compile(this.template)(this.props).trim()
    const element = container.content.firstChild
    if (!(element instanceof HTMLElement)) {
      throw new Error("`element` is not an HTMLElement instance.")
    }
    this.element = element
  }

  private makePropsProxy = (props: TProps): TProps => {
    return new Proxy(props, {
      set: (previousProps: TProps, propName, value: TProps[keyof TProps]) => {
        const nextProps = {
          ...previousProps,
          [propName]: value,
        }

        this.props = nextProps

        this.eventBus.emitEvent({
          eventName: "COMPONENT_DID_UPDATE",
          eventListenerArguments: {
            previousProps,
            nextProps: nextProps,
          },
        })
        return true
      },
      deleteProperty() {
        throw new Error("Access denied.")
      },
    })
  }

  public get markup() {
    if (this.element === null) return ""
    console.log("Block's markup getter is called.")
    return this.element.outerHTML
  }

  private rerender() {
    console.log("Block's render is called.")
    this.props = this.makePropsProxy(this.props)
    this.initialize()

    console.log("this.props >>", this.props)
    document.querySelector(`[block-id="${this.blockId}"]`)!.outerHTML = this.markup
  }
}
