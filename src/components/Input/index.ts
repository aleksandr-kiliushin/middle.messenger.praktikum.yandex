import { Block, TBlockBaseProps } from "@utils/Block"

import { template } from "./template"

interface IInputProps extends TBlockBaseProps {
  name: string
  type: "password" | "text"
  initialValue: string
  placeholder?: string
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({ template, props })
  }

  componentDidMount() {
    // if (this.props.name === "email") {
    //   console.log("INPUT MOUNTED EMAIL:", this.props.initialValue || "empty")
    // }

    if (this.elementOnPage instanceof HTMLInputElement) {
      this.elementOnPage.value = this.props.initialValue
    }
  }

  // componentDidUpdate(previousProps: IInputProps) {
  //   if (this.props.name === "email") {
  //     console.log("INPUT PREVIOUS EMAIL:", previousProps.initialValue || "empty")
  //     console.log("INPUT UPDATED EMAIL:", this.props.initialValue || "empty")
  //   }
  // }
}
