import { AuthApi, TSignInPayload, TSignUpPayload } from "@api/AuthApi"
import { store } from "@store"

import { usersController } from "./usersController"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }

  public async signUp({ payload }: { payload: TSignUpPayload }) {
    store.setState("authorizedUserLoadingStatus", "LOADING")

    try {
      await this.api.signUp({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.setState("authorizedUserLoadingStatus", "FAILED")
    }
  }

  public async signIn({ payload }: { payload: TSignInPayload }) {
    store.setState("authorizedUserLoadingStatus", "LOADING")

    try {
      await this.api.signIn({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.setState("authorizedUserLoadingStatus", "FAILED")
    }
  }

  public async signOut() {
    store.setState("authorizedUserLoadingStatus", "LOADING")

    try {
      await this.api.signOut()
      store.setState("authorizedUserLoadingStatus", "INITIAL")
      store.setState("authorizedUserData", null)
    } catch {
      store.setState("authorizedUserLoadingStatus", "FAILED")
    }
  }
}

export const authController = new AuthController()
