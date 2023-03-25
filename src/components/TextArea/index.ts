import { template } from "./template"
import { Block, TBlockBaseProps } from "../../utils/Block"

interface ITextAreaProps extends TBlockBaseProps {
  name: string
}

export class TextArea extends Block<ITextAreaProps> {
  constructor(props: ITextAreaProps) {
    super(template, props)
  }
}
