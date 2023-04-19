import { store } from "@store"

import { AuthApi, TSignInPayload, TSignUpPayload } from "@api/AuthApi"

import { usersController } from "./usersController"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }

  public async signUp({ payload }: { payload: TSignUpPayload }) {
    await this.api.signUp({ payload })
    await usersController.fetchAndSetAuthorizedUser()
  }

  public async signIn({ payload }: { payload: TSignInPayload }) {
    await this.api.signIn({ payload })
    await usersController.fetchAndSetAuthorizedUser()
  }

  public async signOut() {
    await this.api.signOut()
    store.setState("authorizedUserData", null)
  }
}

export const authController = new AuthController()
