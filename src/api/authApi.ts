import { request } from "@utils/request"

export type TSignUpPayload = {
  email: string
  first_name: string
  login: string
  password: string
  phone: string
  second_name: string
}

export type TSignInPayload = {
  login: string
  password: string
}

class AuthApi {
  public signUp({ payload }: { payload: TSignUpPayload }) {
    return request({ method: "POST", url: "/auth/signup", payload })
  }

  public signIn({ payload }: { payload: TSignInPayload }) {
    return request({ method: "POST", url: "/auth/signin", payload })
  }

  public signOut() {
    return request({ method: "POST", url: "/auth/logout" })
  }

  public getAuthorizedUser() {
    return request({ method: "GET", url: "/auth/user" })
  }
}

export const authApi = new AuthApi()
