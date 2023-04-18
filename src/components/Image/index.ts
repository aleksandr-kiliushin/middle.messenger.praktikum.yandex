import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

type TImageProps = TBlockBaseProps & {
  src: string
  height: number
  width: number
  alt: string
  className?: string
}

export class Image extends Block<TImageProps> {
  constructor(props: TImageProps) {
    super({ template, props })
  }
}
