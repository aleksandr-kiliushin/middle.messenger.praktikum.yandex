import { AuthApi } from "@api/AuthApi"

class AuthController {
  private api: AuthApi

  constructor() {
    this.api = new AuthApi()
  }
}

export const authController = new AuthController()
