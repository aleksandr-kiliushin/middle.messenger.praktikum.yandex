import { ChangePassword } from "@pages/ChangePassword"
import { Chats } from "@pages/Chats"
import { InternalServerError } from "@pages/InternalServerError"
import { PageNotFound } from "@pages/PageNotFound"
import { Profile } from "@pages/Profile"
import { Settings } from "@pages/Settings"
import { SignIn } from "@pages/SignIn"
import { SignUp } from "@pages/SignUp"

import { Block, TBlockBaseProps } from "./Block"

type TRouteConfigByPathname = {
  "/": {
    RouteBlock: typeof SignIn
    routeBlockProps: TBlockBaseProps
  }
  "/500": {
    RouteBlock: typeof InternalServerError
    routeBlockProps: TBlockBaseProps
  }
  "/change-password": {
    RouteBlock: typeof ChangePassword
    routeBlockProps: TBlockBaseProps
  }
  "/messenger": {
    RouteBlock: typeof Chats
    routeBlockProps: TBlockBaseProps
  }
  "/profile": {
    RouteBlock: typeof Profile
    routeBlockProps: TBlockBaseProps
  }
  "/settings": {
    RouteBlock: typeof Settings
    routeBlockProps: TBlockBaseProps
  }
  "/sign-up": {
    RouteBlock: typeof SignUp
    routeBlockProps: TBlockBaseProps
  }
  [key: string]: {
    RouteBlock: typeof PageNotFound
    routeBlockProps: TBlockBaseProps
  }
}

class Route<
  TRoutePathname extends keyof TRouteConfigByPathname,
  TRouteBlockProps extends TBlockBaseProps,
  TRouteBlock extends typeof Block<TRouteBlockProps>
> {
  private pathname: TRoutePathname
  private RouteBlock: TRouteBlock
  private routeBlockProps: TRouteBlockProps

  constructor({
    pathname,
    RouteBlock,
    routeBlockProps,
  }: {
    pathname: TRoutePathname
    RouteBlock: TRouteBlock
    routeBlockProps: TRouteBlockProps
  }) {
    this.pathname = pathname
    this.RouteBlock = RouteBlock
    this.routeBlockProps = routeBlockProps
  }

  public match({ pathname }: { pathname: TRoutePathname }) {
    return pathname === this.pathname
  }

  public navigate({ pathname }: { pathname: TRoutePathname }) {
    if (!this.match({ pathname })) return

    this.pathname = pathname
    this.render()
  }

  public render() {
    const root = document.querySelector("#root")
    if (root === null) {
      throw new Error("#root is not found.")
    }
    root.innerHTML = new this.RouteBlock(this.RouteBlock.template, this.routeBlockProps).markup
  }
}

class Router {
  private static instance: Router | null
  private history: History
  private routes: Route<
    keyof TRouteConfigByPathname,
    TRouteConfigByPathname[keyof TRouteConfigByPathname]["routeBlockProps"],
    TRouteConfigByPathname[keyof TRouteConfigByPathname]["RouteBlock"]
  >[]
  private pageNotFoundRoute: Route<string, TBlockBaseProps, typeof PageNotFound>

  constructor() {
    this.history = window.history
    this.routes = []
    this.pageNotFoundRoute = new Route({ pathname: "does-not-matter", RouteBlock: PageNotFound, routeBlockProps: {} })
    if (Router.instance !== null) {
      return Router.instance
    }
  }

  public use<TRoutePathname extends keyof TRouteConfigByPathname>({
    pathname,
    RouteBlock,
    routeBlockProps,
  }: {
    pathname: TRoutePathname
    RouteBlock: TRouteConfigByPathname[TRoutePathname]["RouteBlock"]
    routeBlockProps: TRouteConfigByPathname[TRoutePathname]["routeBlockProps"]
  }) {
    this.routes.push(
      new Route<
        TRoutePathname,
        TRouteConfigByPathname[TRoutePathname]["routeBlockProps"],
        TRouteConfigByPathname[TRoutePathname]["RouteBlock"]
      >({
        pathname,
        RouteBlock,
        routeBlockProps,
      })
    )
    return this
  }

  private onRoute({ pathname }: { pathname: keyof TRouteConfigByPathname }) {
    const route = this.routes.find((route) => route.match({ pathname: String(pathname) }))

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

  public go({ pathname }: { pathname: keyof TRouteConfigByPathname }) {
    this.history.pushState({}, "", String(pathname))
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
