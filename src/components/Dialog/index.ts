import { Box } from "@components/Box"
import { Button } from "@components/Button"

import { Block, TBlockBaseProps } from "@utils/Block"

import "./index.css"
import { template } from "./template"

export type TDialogProps = TBlockBaseProps & {
  onClose: () => void
  heading: string
}

export class Dialog extends Block<TDialogProps> {
  constructor(props: TDialogProps) {
    super({ template, props })
  }

  render() {
    return {
      children: [
        new Box({
          className: "dialog-header",
          children: [
            new Box({ tag: "h2", content: this.props.heading }),
            new Button({ startIconName: "close", eventsListeners: { click: this.props.onClose } }),
          ],
        }),
        new Box({
          className: "dialog-body",
          children: this.props.children ?? [],
        }),
      ],
    }
  }
}
