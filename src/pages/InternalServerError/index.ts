import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"

export class InternalServerError extends Block {
  render() {
    return {
      children: [
        new PageWrapper({
          children: [
            new Box({ tag: "h1", content: "500" }),
            new Box({ tag: "p", content: "Мы уже фиксим." }),
            new Anchor({ href: "/messenger", content: "Назад к чатам" }),
          ],
        }),
      ],
    }
  }
}
