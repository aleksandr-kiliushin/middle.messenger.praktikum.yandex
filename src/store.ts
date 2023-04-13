import { setToObject } from "@utils/setToObject"

type TState = {
  [key: string]: unknown
}

class Store {
  private state: TState

  constructor() {
    this.state = {}
  }

  public set({ keyPath, value }: { keyPath: string; value: unknown }) {
    setToObject({ object: this.state, keyPath, value })
  }

  public get getState() {
    return this.state
  }
}

export const store = new Store()
