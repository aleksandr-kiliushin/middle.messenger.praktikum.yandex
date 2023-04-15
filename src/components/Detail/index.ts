import { Block, TBlockBaseProps } from "../../utils/Block"
import "./index.css"
import { template } from "./template"

interface IDetailProps extends TBlockBaseProps {
  content: string
}

export class Detail extends Block<IDetailProps> {
  constructor(props: IDetailProps) {
    super(template, props)
  }
}
