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

export class AuthApi {
  public signUp({ payload }: { payload: TSignUpPayload }) {
    return request({ method: "POST", url: "/auth/signup", payload })
  }

  public signIn({ payload }: { payload: TSignInPayload }) {
    return request({ method: "POST", url: "/auth/signin", payload })
  }

  public signOut() {
    return request({ method: "POST", url: "/auth/logout" })
  }
}
