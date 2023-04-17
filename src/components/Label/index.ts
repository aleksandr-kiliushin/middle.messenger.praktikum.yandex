import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

export type TLabelProps = TBlockBaseProps & {
  for?: string
  content?: string
  className?: string
}

export class Label extends Block<TLabelProps> {
  constructor(props: TLabelProps) {
    super({ template, props })
  }
}
