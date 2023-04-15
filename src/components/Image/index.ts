import { Block, TBlockBaseProps } from "../../utils/Block"
import { template } from "./template"

interface IImageProps extends TBlockBaseProps {
  src: string
  height: number
  width: number
  alt: string
  className?: string
}

export class Image extends Block<IImageProps> {
  constructor(props: IImageProps) {
    super(template, props)
  }
}
