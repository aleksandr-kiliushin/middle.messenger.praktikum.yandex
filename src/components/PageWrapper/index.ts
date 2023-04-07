import Handlebars from "handlebars"
import { Block } from "@utils/Block"
import { Navigation } from "../Navigation"
import { template } from "./template"

type TPageWrapperProps = {
  content: string
}

export class PageWrapper extends Block<TPageWrapperProps> {
  constructor(props: TPageWrapperProps) {
    super(
      Handlebars.compile(template)({
        Navigation: new Navigation().markup,
        content: props.content,
      }),
      props
    )
  }
}
