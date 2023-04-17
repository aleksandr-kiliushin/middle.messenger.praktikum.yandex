import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"

export class PageNotFound extends Block {
  render() {
    return {
      children: [
        new PageWrapper({
          children: [
            new Box({ tag: "h1", content: "404" }),
            new Box({ tag: "p", content: "Не туда попали." }),
            new Anchor({ href: "/messenger", content: "Назад к чатам" }),
          ],
        }),
      ],
    }
  }
}
