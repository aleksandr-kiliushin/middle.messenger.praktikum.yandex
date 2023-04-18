import { store } from "@store"

import { TChangePasswordPayload, TEditSettingsPayload, UsersApi } from "@api/UsersApi"

class UsersController {
  private api: UsersApi

  constructor() {
    this.api = new UsersApi()
  }

  public async fetchAndSetAuthorizedUser() {
    // store.setState("authorizedUserLoadingStatus", "LOADING")

    try {
      const response = await this.api.getAuthorizedUser()
      const authorizedUser = response.data
      if (authorizedUser === null) {
        // store.setState("authorizedUserLoadingStatus", "FAILED")
      } else {
        // store.setState("authorizedUserLoadingStatus", "DONE")
        store.setState("authorizedUserData", authorizedUser)
      }
    } catch {
      // store.setState("authorizedUserLoadingStatus", "FAILED")
    }
  }

  public async changePassword({ payload }: { payload: TChangePasswordPayload }) {
    await this.api.changePassword({ payload })
  }

  public async editSettings({ payload }: { payload: TEditSettingsPayload }) {
    const response = await this.api.editSettings({ payload })
    if (response !== null) {
      store.setState("authorizedUserData", response.data)
    }
  }

  public async changeAvatar({ avatar }: { avatar: File }) {
    const response = await this.api.changeAvatar({ avatar })
    if (response !== null) {
      store.setState("authorizedUserData", response.data)
    }
  }
}

export const usersController = new UsersController()
