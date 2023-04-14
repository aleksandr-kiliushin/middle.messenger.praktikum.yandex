import { AuthApi, TSignInPayload, TSignUpPayload } from "@api/AuthApi"
import { store } from "@store"

import { usersController } from "./usersController"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }

  public async signUp({ payload }: { payload: TSignUpPayload }) {
    store.set({ keyPath: "authorizedUser.loadingStatus", value: "LOADING" })

    try {
      await this.api.signUp({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.set({ keyPath: "user.loadingStatus", value: "FAILED" })
    }
  }

  public async signIn({ payload }: { payload: TSignInPayload }) {
    store.set({ keyPath: "authorizedUser.loadingStatus", value: "LOADING" })

    try {
      await this.api.signIn({ payload })
      await usersController.fetchAndSetAuthorizedUser()
    } catch {
      store.set({ keyPath: "user.loadingStatus", value: "FAILED" })
    }
  }

  public async signOut() {
    store.set({ keyPath: "authorizedUser.loadingStatus", value: "LOADING" })

    try {
      await this.api.signOut()
      store
        .set({ keyPath: "authorizedUser.loadingStatus", value: "INITIAL" })
        .set({ keyPath: "authorizedUser.data", value: null })
    } catch {
      store.set({ keyPath: "authorizedUser.loadingStatus", value: "FAILED" })
    }
  }
}

export const authController = new AuthController()
