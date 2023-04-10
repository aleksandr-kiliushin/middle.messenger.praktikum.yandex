import { PageNotFound } from "@pages/PageNotFound"

import { Block } from "./Block"

export class PageBlock extends Block {
  constructor() {
    super("", {})
  }
}

class Route {
  private pathname: string
  private pageBlockClass: typeof PageBlock
  private pageBlock: PageBlock | null

  constructor({ pageBlockClass, pathname }: { pageBlockClass: typeof PageBlock; pathname: string }) {
    this.pathname = pathname
    this.pageBlockClass = pageBlockClass
    this.pageBlock = null
  }

  public match({ pathname }: { pathname: string }) {
    return pathname === this.pathname
  }

  public navigate({ pathname }: { pathname: string }) {
    if (!this.match({ pathname })) return

    this.pathname = pathname
    this.render()
  }

  public leave() {
    if (this.pageBlock === null) {
      console.error("this.pageBlock is null.")
      return
    }

    this.pageBlock.hide()
  }

  public render() {
    if (this.pageBlock === null) {
      this.pageBlock = new this.pageBlockClass()

      const root = document.querySelector("#root")
      if (root === null) {
        throw new Error("#root is not found.")
      }
      root.innerHTML = this.pageBlock.markup

      return
    }

    this.pageBlock.show()
  }
}

export class Router {
  private static instance: Router | null
  private history: History
  private routes: Route[]
  private currentRoute: Route | null
  private pageNotFoundRoute: Route

  constructor() {
    this.routes = []
    this.history = window.history
    this.currentRoute = null
    this.pageNotFoundRoute = new Route({ pageBlockClass: PageNotFound, pathname: "does-not-matter" })

    if (Router.instance !== null) {
      return Router.instance
    }
  }

  public use({ pageBlockClass, pathname }: { pageBlockClass: typeof PageBlock; pathname: string }) {
    this.routes.push(new Route({ pageBlockClass, pathname }))
    return this
  }

  private onRoute({ pathname }: { pathname: string }) {
    const route = this.routes.find((route) => route.match({ pathname }))

    this.currentRoute?.leave()

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
