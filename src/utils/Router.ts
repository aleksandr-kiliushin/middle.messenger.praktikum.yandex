import { Profile } from "@pages/Profile"

class Route {
  private pathname: string
  private blockClass: typeof Profile
  private block: Profile | null

  constructor({ blockClass, pathname }: { blockClass: typeof Profile; pathname: string }) {
    this.pathname = pathname
    this.blockClass = blockClass
    this.block = null
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
    if (this.block === null) {
      console.error("this.block is null.")
      return
    }

    this.block.hide()
  }

  public render() {
    if (this.block === null) {
      this.block = new this.blockClass()

      const root = document.querySelector("#root")
      if (root === null) {
        throw new Error("#root is not found.")
      }
      root.innerHTML = this.block.markup

      return
    }

    this.block.show()
  }
}

export class Router {
  private static instance: Router | null
  private history: History
  private routes: Route[]
  private currentRoute: Route | null

  constructor() {
    this.routes = []
    this.history = window.history
    this.currentRoute = null

    if (Router.instance !== null) {
      return Router.instance
    }
  }

  public use({ blockClass, pathname }: { blockClass: typeof Profile; pathname: string }) {
    this.routes.push(new Route({ blockClass, pathname }))
    return this
  }

  private onRoute({ pathname }: { pathname: string }) {
    const route = this.routes.find((route) => route.match({ pathname }))
    if (route === undefined) {
      console.error("route is not found.")
      return
    }

    this.currentRoute?.leave()

    route.render()
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
