import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

interface IInputProps extends TBlockBaseProps {
  name: string
  type?: "number" | "password" | "text"
  initialValue?: string | undefined
  className?: string
  placeholder?: string
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({ template, props })
  }

  componentDidMount() {
    if (this.props.initialValue !== undefined && this.elementOnPage instanceof HTMLInputElement) {
      this.elementOnPage.value = this.props.initialValue
    }
  }
}
