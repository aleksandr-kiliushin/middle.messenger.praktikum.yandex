import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"

import { Block } from "@utils/Block"

import "./index.css"

const navigationItems: { href: string; content: string }[] = [
  { href: "/messenger", content: "Чаты" },
  { href: "/profile", content: "Профиль" },
  { href: "/settings", content: "Настройки" },
  { href: "/change-password", content: "Изменить пароль" },
  { href: "/", content: "Войти" },
  { href: "/sign-up", content: "Зарегистрироваться" },
  { href: "/404", content: "404" },
  { href: "/500", content: "500" },
]

export class Navigation extends Block {
  constructor() {
    super({
      template: '<ul class="navigation"></ul>',
      props: {
        children: [
          new Box({
            tag: "ul",
            content: "",
            children: navigationItems.map(({ content, href }) => {
              return new Box({ tag: "li", children: [new Anchor({ content, href })] })
            }),
          }),
        ],
      },
    })
  }
}
