import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

interface IRowProps extends TBlockBaseProps {
  field: Block["markup"]
  label?: string
  name: string
}

export class Row extends Block<IRowProps> {
  constructor(props: IRowProps) {
    super(template, props)
  }
}
