import { _Profile } from "@pages/Profile"
import { TLoadingStatus, TUser } from "@types"

import { TBlockBaseProps } from "@utils/Block"
import { EventBus } from "@utils/EventBus"

type TGetPropsFromStore<TPropsFromStore> = (state: TStoreState) => TPropsFromStore

type TStoreState = {
  authorizedUserData: TUser | null
  authorizedUserLoadingStatus: TLoadingStatus
}

const initialState: TStoreState = {
  authorizedUserData: null,
  authorizedUserLoadingStatus: "INITIAL",
}

class Store extends EventBus<{
  STORE_STATE_UPDATED: null
}> {
  public state: TStoreState

  constructor() {
    super()
    this.state = new Proxy(initialState, {
      set: (previousState: TStoreState, keyName, value: TStoreState[keyof TStoreState]) => {
        this.state = { ...previousState, [keyName]: value }
        this.emitEvent({ eventName: "STORE_STATE_UPDATED", eventListenerParams: null })
        return true
      },
    })

    this.registerEventListener({
      eventName: "STORE_STATE_UPDATED",
      eventListener: () => {},
    })
  }

  public getState() {
    return this.state
  }
}

export const store = new Store()

type TBlockToBeWrappedWithStore = typeof _Profile

export const withStore = <TOwnProps extends TBlockBaseProps, TPropsFromStore>(
  getPropsFromStore: TGetPropsFromStore<TPropsFromStore>
) => {
  return (BlockToBeWrappedWithStore: TBlockToBeWrappedWithStore) => {
    return class BlockWithStore extends BlockToBeWrappedWithStore<TOwnProps & TPropsFromStore> {
      constructor({ ownProps }: { ownProps: TOwnProps }) {
        const propsFromStore = getPropsFromStore(store.getState())
        super({ props: { ...propsFromStore, ...ownProps } })
        store.registerEventListener({
          eventName: "STORE_STATE_UPDATED",
          eventListener: () => {
            this.props = { ...this.props, ...getPropsFromStore(store.getState()) }
          },
        })
      }
    }
  }
}
