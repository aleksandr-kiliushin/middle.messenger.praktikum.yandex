import { AuthApi, TSignInPayload, TSignUpPayload } from "@api/AuthApi"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }

  public async signUp({ payload }: { payload: TSignUpPayload }) {
    await this.api.signUp({ payload })
  }

  public signIn({ payload }: { payload: TSignInPayload }) {
    return this.api.signIn({ payload })
  }

  public signOut() {
    return this.api.signOut()
  }
}

export const authController = new AuthController()
