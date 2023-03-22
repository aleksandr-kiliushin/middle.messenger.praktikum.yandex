import { template } from "./template"
import "./index.css"
import { Block, TBlockBaseProps } from "../../utils/Block"

interface IButtonProps extends TBlockBaseProps {
  endIconName?: string
  startIconName?: string
  text?: string
  type: "button" | "submit"
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props, template)
  }
}
