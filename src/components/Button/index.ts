import { Block, TBlockBaseProps } from "../../utils/Block"
import "./index.css"
import { template } from "./template"

type TButtonProps = TBlockBaseProps & {
  endIconName?: string
  startIconName?: string
  text?: string
  type?: "button" | "submit"
  className?: string
  isDisabled?: boolean
}

export class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super({ template, props })
  }
}
