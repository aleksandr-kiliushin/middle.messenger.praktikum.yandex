import { ChangePassword } from "@pages/ChangePassword"
import { Chats } from "@pages/Chats"
import { InternalServerError } from "@pages/InternalServerError"
import { PageNotFound } from "@pages/PageNotFound"
import { Profile } from "@pages/Profile"
import { Settings } from "@pages/Settings"
import { SignIn } from "@pages/SignIn"
import { SignUp } from "@pages/SignUp"

type TRouteBlock =
  | typeof ChangePassword
  | typeof Chats
  | typeof InternalServerError
  | typeof Profile
  | typeof Settings
  | typeof SignIn
  | typeof SignUp

class Route {
  private pathname: string
  private RouteBlock: TRouteBlock

  constructor({ pathname, RouteBlock }: { pathname: string; RouteBlock: TRouteBlock }) {
    this.pathname = pathname
    this.RouteBlock = RouteBlock
  }

  public match({ pathname }: { pathname: string }) {
    return pathname === this.pathname
  }

  public navigate({ pathname }: { pathname: string }) {
    if (!this.match({ pathname })) return

    this.pathname = pathname
    this.render()
  }

  public render() {
    const root = document.querySelector("#root")
    if (root === null) {
      throw new Error("#root is not found.")
    }
    root.innerHTML = new this.RouteBlock({ ownProps: {} }).markup
  }
}

class Router {
  private static instance: Router | null
  private history: History
  private routes: Route[]
  private pageNotFoundRoute: Route

  constructor() {
    this.history = window.history
    this.routes = []
    this.pageNotFoundRoute = new Route({ pathname: "does-not-matter", RouteBlock: PageNotFound })
    if (Router.instance !== null) {
      return Router.instance
    }
  }

  public use({ pathname, RouteBlock }: { pathname: string; RouteBlock: TRouteBlock }) {
    this.routes.push(new Route({ pathname, RouteBlock }))
    return this
  }

  private onRoute({ pathname }: { pathname: string }) {
    const route = this.routes.find((route) => route.match({ pathname }))

    if (route === undefined) {
      this.pageNotFoundRoute.render()
    } else {
      route.render()
    }
  }

  public start() {
    window.onpopstate = (event) => {
      if (event.currentTarget === null) {
        console.error("event.currentTarget is null.")
        return
      }
      if (!("location" in event.currentTarget)) {
        console.error("event.currentTarget does not contain 'location' field.")
        return
      }
      if (!(event.currentTarget.location instanceof Location)) {
        console.error("event.currentTarget.location is not instance of Location.")
        return
      }

      this.onRoute({ pathname: event.currentTarget.location.pathname })
    }

    window.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) return

      const clickedAnchor = event.target.closest("a")
      if (!(clickedAnchor instanceof HTMLAnchorElement)) return

      event.preventDefault()
      const href = clickedAnchor.getAttribute("href")
      if (href === null) return

      this.go({ pathname: href })
    })

    this.onRoute({ pathname: window.location.pathname })
  }

  public go({ pathname }: { pathname: string }) {
    this.history.pushState({}, "", pathname)
    this.onRoute({ pathname })
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }
}

export const router = new Router()
