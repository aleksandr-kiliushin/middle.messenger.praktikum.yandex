/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageBlock, TLoadingStatus, TUser } from "@types"

import { Block } from "@utils/Block"
import { EventBus } from "@utils/EventBus"
import { setToObject } from "@utils/setToObject"

type TMapStateToProps = (state: TStoreState) => any

type TStoreState = {
  authorizedUser: {
    data: TUser | null
    loadingStatus: TLoadingStatus
  }
}

class Store extends EventBus<"UPDATED"> {
  private state: TStoreState

  constructor() {
    super()
    this.state = {
      authorizedUser: {
        data: null,
        loadingStatus: "INITIAL",
      },
    }
  }

  public set({ keyPath, value }: { keyPath: string; value: unknown }) {
    setToObject({ object: this.state, keyPath, value })
    this.emitEvent({ eventName: "UPDATED", eventListenerArguments: { newState: this.state } })
    return this
  }

  public getState() {
    return this.state
  }
}

export const store = new Store()

export const withStore = (mapStateToProps: TMapStateToProps) => {
  return (_Block: typeof Block | typeof PageBlock) => {
    return class BlockWithStore extends Block {
      constructor(template: string, ownProps: any) {
        const mappedState = mapStateToProps(store.getState())
        super(template, { ...mappedState, ...ownProps })
        store.registerEventListener({
          eventName: "UPDATED",
          eventListener: ({ newState }: { newState: TStoreState }) => {
            const newMappedState = mapStateToProps(newState)
            this.props = { ...this.props, ...newMappedState }
          },
        })
      }
    }
  }
}
