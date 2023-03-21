import Handlebars from "handlebars"
import { template } from "./template"
import "./index.css"
import { Block } from "../../utils/Block"

interface IButtonProps {
  endIconName?: string
  startIconName?: string
  text?: string
  type: "button" | "submit"
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props)
  }

  public render() {
    return Handlebars.compile(template)(this.props)
  }
}
