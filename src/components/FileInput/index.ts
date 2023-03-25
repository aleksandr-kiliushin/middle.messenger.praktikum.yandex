import { Block } from "../../utils/Block"
import { template } from "./template"
import "./index.css"

type TFileInputProps = {
  name: string
}

export class FileInput extends Block<TFileInputProps> {
  constructor(props: TFileInputProps) {
    super(template, props)
  }
}
