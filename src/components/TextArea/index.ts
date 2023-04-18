import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

type TTextAreaProps = TBlockBaseProps & {
  name: string
}

export class TextArea extends Block<TTextAreaProps> {
  constructor(props: TTextAreaProps) {
    super({ template, props })
  }
}
