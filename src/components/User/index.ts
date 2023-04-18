import { TUser } from "@types"

import { Block, TBlockBaseProps } from "@utils/Block"

import "./index.css"
import { template } from "./template"

export type TUserProps = TBlockBaseProps & TUser

export class User extends Block<TUserProps> {
  constructor(props: TUserProps) {
    super({ template, props })
  }
}
