import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

interface ITextAreaProps extends TBlockBaseProps {
  name: string
}

export class TextArea extends Block<ITextAreaProps> {
  constructor(props: ITextAreaProps) {
    super(template, props)
  }
}
