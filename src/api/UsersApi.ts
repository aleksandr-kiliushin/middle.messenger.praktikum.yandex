import { request } from "@utils/request"

import { TUser } from "@types"

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
    return request<TUser>({ method: "PUT", url: "/user/profile", payload })
  }

  public changeAvatar({ avatar }: { avatar: File }) {
    const payload = new FormData()
    payload.append("avatar", avatar, avatar.name)

    return request<TUser>({ method: "PUT", url: "/user/profile/avatar", payload })
  }
}
