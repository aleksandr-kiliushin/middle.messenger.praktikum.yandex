import Handlebars from "handlebars"

import { PageWrapper } from "@components/PageWrapper"

import { Block } from "@utils/Block"

import { template } from "./template"

export class PageNotFound extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({}),
      }).markup,
      {}
    )
  }
}
