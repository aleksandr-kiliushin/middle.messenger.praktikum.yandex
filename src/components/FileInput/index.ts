import { Block } from "../../utils/Block"
import { template } from "./template"

type TFileInputProps = {
  name: string
}

export class FileInput extends Block<TFileInputProps> {
  constructor(props: TFileInputProps) {
    super(template, props)
  }
}
