import { Box } from "@components/Box"
import { Navigation } from "@components/Navigation"

import { Block, TBlockBaseProps } from "@utils/Block"

type TPageWrapperProps = TBlockBaseProps & {
  mainClass?: string
}

export class PageWrapper extends Block<TPageWrapperProps> {
  constructor(props: TPageWrapperProps) {
    super({
      template: '<div id="page-wrapper"></div>',
      props: {
        children: [
          new Navigation(),
          new Box({
            tag: "main",
            children: props.children ?? [],
            className: props.mainClass ?? "",
          }),
        ],
      },
    })
  }
}
