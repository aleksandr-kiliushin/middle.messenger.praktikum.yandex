export const testUsers = {
  johnDoe: {
    email: "johndoe@example.com",
    first_name: "John",
    id: 42,
    login: "john-doe",
    password: "Qwerty123",
    phone: "79801112233",
    second_name: "Doe",
  },
} as const

export type TTestUser = (typeof testUsers)[keyof typeof testUsers]

export const credentialsByTestUserId: Record<TTestUser["id"], { password: string; login: TTestUser["login"] }> = {
  "42": {
    login: testUsers.johnDoe.login,
    password: testUsers.johnDoe.password,
  },
}
