import { Block, TBlockBaseProps } from "@utils/Block"

import "./index.css"
import { template } from "./template"

type TFileInputProps = TBlockBaseProps & {
  name: string
}

export class FileInput extends Block<TFileInputProps> {
  constructor(props: TFileInputProps) {
    super(template, props)
  }
}
