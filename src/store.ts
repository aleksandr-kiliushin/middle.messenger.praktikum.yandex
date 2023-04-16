import { _Profile } from "@pages/Profile"
import { TLoadingStatus, TUser } from "@types"

import { TBlockBaseProps } from "@utils/Block"
import { EventBus } from "@utils/EventBus"

export type TStoreState = {
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

const getPropsFromStore = <TStoreStateKey extends keyof TStoreState>({
  storeStateKeys,
}: {
  storeStateKeys: TStoreStateKey[]
}) => {
  const result: Partial<TStoreState> = {}
  for (const key of storeStateKeys) {
    result[key] = store.getState()[key]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any
}

export const withStore = <TOwnProps extends TBlockBaseProps, TStoreStateKey extends keyof TStoreState>(
  storeStateKeys: TStoreStateKey[]
) => {
  return (BlockToBeWrappedWithStore: TBlockToBeWrappedWithStore) => {
    return class BlockWithStore extends BlockToBeWrappedWithStore {
      constructor({ ownProps }: { ownProps: TOwnProps }) {
        super({ props: { ...getPropsFromStore({ storeStateKeys }), ...ownProps } })
        store.registerEventListener({
          eventName: "STORE_STATE_UPDATED",
          eventListener: () => {
            this.props = { ...this.props, ...getPropsFromStore({ storeStateKeys }) }
          },
        })
      }
    }
  }
}
