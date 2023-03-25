import { template } from "./template"
import { Block, TBlockBaseProps } from "../../utils/Block"

interface IInputProps extends TBlockBaseProps {
  name: string
  type: "text" | "password"
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super(template, props)
  }
}
