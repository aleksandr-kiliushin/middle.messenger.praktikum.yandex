import { UsersApi } from "@api/UsersApi"
import { store } from "@store"

class UsersController {
  private api: UsersApi

  constructor() {
    this.api = new UsersApi()
  }

  public async fetchAndSetAuthorizedUser() {
    store.set({ keyPath: "authorizedUser.loadingStatus", value: "LOADING" })

    try {
      const response = await this.api.getAuthorizedUser()
      const authorizedUser = response.data
      if (authorizedUser === null) {
        store.set({ keyPath: "user.loadingStatus", value: "FAILED" })
      } else {
        store.set({ keyPath: "user.loadingStatus", value: "DONE" }).set({ keyPath: "user.data", value: authorizedUser })
      }
    } catch {
      store.set({ keyPath: "user.loadingStatus", value: "FAILED" })
    }
  }
}

export const usersController = new UsersController()
