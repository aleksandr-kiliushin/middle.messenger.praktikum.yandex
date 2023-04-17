import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

export type TAnchorProps = TBlockBaseProps & {
  href: string
  content: string
  target?: "_blank" | "_self"
  className?: string
}

export class Anchor extends Block<TAnchorProps> {
  constructor(props: TAnchorProps) {
    super({ template, props })
  }
}
