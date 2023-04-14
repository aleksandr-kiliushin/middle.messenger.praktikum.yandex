import { UsersApi } from "@api/UsersApi"

class UsersController {
  private api: UsersApi

  constructor() {
    this.api = new UsersApi()
  }

  public getAuthorizedUser() {
    return this.api.getAuthorizedUser()
  }
}

export const usersController = new UsersController()
