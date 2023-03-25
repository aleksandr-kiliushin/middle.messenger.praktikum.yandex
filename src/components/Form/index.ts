import { template } from "./template"
import { Block, TBlockBaseProps } from "../../utils/Block"
import { Row } from "../Row"
import { Button } from "../Button"

interface IFormProps extends TBlockBaseProps {
  rows: Row["markup"][]
  buttons: Button["markup"][]
}

export class Form extends Block<IFormProps> {
  constructor(props: IFormProps) {
    super(template, props)
  }
}
