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
  public render() {
    return Handlebars.compile(template)(this.props)
  }
}
