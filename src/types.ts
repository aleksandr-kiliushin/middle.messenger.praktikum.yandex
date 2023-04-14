export type TUser = {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export type TLoadingStatus = "DONE" | "FAILED" | "INITIAL" | "LOADING"
