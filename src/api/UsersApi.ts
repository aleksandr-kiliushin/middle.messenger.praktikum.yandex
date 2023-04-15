import { TUser } from "src/types"

import { request } from "@utils/request"

export type TChangePasswordPayload = {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export type TEditSettingsPayload = {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export class UsersApi {
  public getAuthorizedUser() {
    return request<TUser>({ method: "GET", url: "/auth/user" })
  }

  public changePassword({ payload }: { payload: TChangePasswordPayload }) {
    return request({ method: "PUT", url: "/user/password", payload })
  }

  public editSettings({ payload }: { payload: TEditSettingsPayload }) {
    return request({ method: "PUT", url: "/user/profile", payload })
  }
}
