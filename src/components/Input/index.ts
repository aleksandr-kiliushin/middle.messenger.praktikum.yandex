import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

interface IInputProps extends TBlockBaseProps {
  name: string
  type: "text" | "password"
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super(template, props)
  }
}
