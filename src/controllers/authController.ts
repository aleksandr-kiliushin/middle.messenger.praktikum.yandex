import { AuthApi, TSignInPayload, TSignUpPayload } from "@api/AuthApi"
import { store } from "@store"

import { usersController } from "./usersController"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }

  public async signUp({ payload }: { payload: TSignUpPayload }) {
    store.state.authorizedUserLoadingStatus = "LOADING"

    try {
      await this.api.signUp({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.state.authorizedUserLoadingStatus = "FAILED"
    }
  }

  public async signIn({ payload }: { payload: TSignInPayload }) {
    store.state.authorizedUserLoadingStatus = "LOADING"

    try {
      await this.api.signIn({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.state.authorizedUserLoadingStatus = "FAILED"
    }
  }

  public async signOut() {
    store.state.authorizedUserLoadingStatus = "LOADING"

    try {
      await this.api.signOut()
      store.state.authorizedUserLoadingStatus = "INITIAL"
      store.state.authorizedUserData = null
    } catch {
      store.state.authorizedUserLoadingStatus = "FAILED"
    }
  }
}

export const authController = new AuthController()
