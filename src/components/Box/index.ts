import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

export type TBoxProps = TBlockBaseProps & {
  tag?: "div" | "form" | "h1" | "h2" | "h3" | "li" | "main" | "nav" | "p" | "span" | "ul"
  content?: string | undefined
  className?: string
}

export class Box extends Block<TBoxProps> {
  constructor(props: TBoxProps) {
    super({ template, props })
  }

  // componentDidMount() {
  //   console.log("BOX MOUNTS, EMAIL:", this.props.content)
  // }

  // componentDidUpdate(prevProps: TBoxProps) {
  //   console.log("BOX UPDATES, PREV EMAIL:", prevProps.content)
  //   console.log("BOX UPDATES, NEXT EMAIL:", this.props.content)
  // }
}
