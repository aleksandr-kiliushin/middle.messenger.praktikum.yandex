import { nanoid } from "nanoid"
import Handlebars from "handlebars"
import { EventBus } from "./EventBus"

export type TBlockBaseProps = {
  eventsListeners?: Partial<Record<keyof HTMLElementEventMap, () => void>>
}

export abstract class Block<TProps extends TBlockBaseProps> {
  protected element: HTMLElement | null
  private blockId: string
  private eventBus: EventBus<"INITIALIZE">

  constructor(protected props: TProps, protected template: string) {
    this.blockId = nanoid(4)
    this.element = null

    this.eventBus = new EventBus()
    this.eventBus.registerEventListener({ eventListener: this.initialize.bind(this), eventName: "INITIALIZE" })

    this.eventBus.emitEvent({ eventName: "INITIALIZE" })
  }

  private initialize() {
    this.createElement()
    if (this.element === null) throw new Error("`this.element` is null.")

    this.element.setAttribute("block-id", this.blockId)

    document.addEventListener("DOMContentLoaded", () => {
      const block = document.querySelector(`[block-id="${this.blockId}"]`)
      if (block === null) return

      for (const eventName in this.props.eventsListeners) {
        const eventListener = this.props.eventsListeners[eventName as keyof HTMLElementEventMap]
        if (eventListener === undefined) continue
        block.addEventListener(eventName, eventListener)
      }
    })
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

  public render(): string {
    if (this.element === null) return ""
    return this.element.outerHTML
  }
}
