export type TUser = {
  avatar: string | null
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export type TLoadingStatus = "DONE" | "FAILED" | "INITIAL" | "LOADING"

export type TChat = {
  id: number
  title: string
  avatar: string | null
  unread_count: number
  last_message: {
    user: TUser
    time: string
    content: string
  } | null
}
