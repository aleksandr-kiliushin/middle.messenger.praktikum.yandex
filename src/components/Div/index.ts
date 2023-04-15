import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

interface IDivProps extends TBlockBaseProps {
  content: string
  className?: string
}

export class Div extends Block<IDivProps> {
  constructor(props: IDivProps) {
    super(template, props)
  }
}
