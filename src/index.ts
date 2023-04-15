import { usersController } from "@controllers/usersController"
import { store } from "@store"

import { isCurrentPathnameProtected } from "@utils/isCurrentPathnameProtected"
import { router } from "@utils/router"

import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { InternalServerError } from "./pages/InternalServerError"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import "./styles"

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await usersController.fetchAndSetAuthorizedUser()
  } catch (error) {
    console.error(error)
  }

  router
    .use({ pathname: "/", RouteBlock: SignIn })
    .use({ pathname: "/500", RouteBlock: InternalServerError })
    .use({ pathname: "/change-password", RouteBlock: ChangePassword })
    .use({ pathname: "/messenger", RouteBlock: Chats })
    .use({ pathname: "/profile", RouteBlock: Profile })
    .use({ pathname: "/settings", RouteBlock: Settings })
    .use({ pathname: "/sign-up", RouteBlock: SignUp })
    .start()
})

window.addEventListener("load", () => {
  let oldHref = document.location.href

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref === document.location.href) return
      oldHref = document.location.href
      if (store.getState().authorizedUser.data !== null) return
      if (isCurrentPathnameProtected()) {
        router.go({ pathname: "/" })
      }
    })
  })

  observer.observe(window.document, { childList: true, subtree: true })
})
