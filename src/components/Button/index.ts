import { Block, TBlockBaseProps } from "../../utils/Block"
import "./index.css"
import { template } from "./template"

interface IButtonProps extends TBlockBaseProps {
  endIconName?: string
  startIconName?: string
  text?: string
  type?: "button" | "submit"
  className?: string
  isDisabled?: boolean
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({ template, props })
  }
}
