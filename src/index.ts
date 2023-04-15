import { usersController } from "@controllers/usersController"

import { router } from "@utils/router"

import { ChangePassword } from "./pages/ChangePassword"
import { Chats } from "./pages/Chats"
import { InternalServerError } from "./pages/InternalServerError"
import { Profile } from "./pages/Profile"
import { Settings } from "./pages/Settings"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import "./styles"

const isPathnameProtected = () => {
  if (window.location.pathname === "/") return false
  if (window.location.pathname.startsWith("/sign-up")) return false
  return true
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await usersController.fetchAndSetAuthorizedUser()
  } catch (error) {
    if (isPathnameProtected()) {
      router.go({ pathname: "/" })
    }
  }

  router
    .use({ pathname: "/", RouteBlock: SignIn, routeBlockProps: {} })
    .use({ pathname: "/500", RouteBlock: InternalServerError, routeBlockProps: {} })
    .use({ pathname: "/change-password", RouteBlock: ChangePassword, routeBlockProps: {} })
    .use({ pathname: "/messenger", RouteBlock: Chats, routeBlockProps: {} })
    .use({ pathname: "/profile", RouteBlock: Profile, routeBlockProps: {} })
    .use({ pathname: "/settings", RouteBlock: Settings, routeBlockProps: {} })
    .use({ pathname: "/sign-up", RouteBlock: SignUp, routeBlockProps: {} })
    .start()
})
