import { Block, TBlockBaseProps } from "../../utils/Block"
import { Button } from "../Button"
import { Row } from "../Row"
import { template } from "./template"

interface IFormProps extends TBlockBaseProps {
  rows: Row["markup"][]
  buttons: Button["markup"][]
  className?: string
}

export class Form extends Block<IFormProps> {
  constructor(props: IFormProps) {
    super(template, props)
  }
}
