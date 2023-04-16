import { TChangePasswordPayload, TEditSettingsPayload, UsersApi } from "@api/UsersApi"
import { store } from "@store"

class UsersController {
  private api: UsersApi

  constructor() {
    this.api = new UsersApi()
  }

  public async fetchAndSetAuthorizedUser() {
    store.state.authorizedUserLoadingStatus = "LOADING"

    try {
      const response = await this.api.getAuthorizedUser()
      const authorizedUser = response.data
      if (authorizedUser === null) {
        store.state.authorizedUserLoadingStatus = "FAILED"
      } else {
        store.state.authorizedUserLoadingStatus = "DONE"
        store.state.authorizedUserData = authorizedUser
      }
    } catch {
      store.state.authorizedUserLoadingStatus = "FAILED"
    }
  }

  public async changePassword({ payload }: { payload: TChangePasswordPayload }) {
    await this.api.changePassword({ payload })
  }

  public async editSettings({ payload }: { payload: TEditSettingsPayload }) {
    await this.api.editSettings({ payload })
    await this.fetchAndSetAuthorizedUser()
  }

  public async changeAvatar({ avatar }: { avatar: File }) {
    await this.api.changeAvatar({ avatar })
    await this.fetchAndSetAuthorizedUser()
  }
}

export const usersController = new UsersController()
