import { TLoadingStatus, TUser } from "@types"

import { Block, TBlockBaseProps } from "@utils/Block"
import { EventBus } from "@utils/EventBus"
import { setToObject } from "@utils/setToObject"

type TGetPropsFromStore<TPropsFromStore> = (state: TStoreState) => TPropsFromStore

type TStoreState = {
  authorizedUser: {
    data: TUser | null
    loadingStatus: TLoadingStatus
  }
}

class Store extends EventBus<{
  UPDATED: { newState: TStoreState }
}> {
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
    this.emitEvent({ eventName: "UPDATED", eventListenerParams: { newState: this.state } })
    return this
  }

  public getState() {
    return this.state
  }
}

export const store = new Store()

export const withStore = <TOwnProps extends TBlockBaseProps, TPropsFromStore>(
  getPropsFromStore: TGetPropsFromStore<TPropsFromStore>
) => {
  return (_Block: typeof Block) => {
    return class BlockWithStore extends Block {
      constructor(template: string, ownProps: TOwnProps) {
        const propsFromStore = getPropsFromStore(store.getState())
        super(template, { ...propsFromStore, ...ownProps })
        store.registerEventListener({
          eventName: "UPDATED",
          eventListener: ({ newState }: { newState: TStoreState }) => {
            const newMappedState = getPropsFromStore(newState)
            this.props = { ...this.props, ...newMappedState }
          },
        })
      }
    }
  }
}
