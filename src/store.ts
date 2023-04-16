import { _Settings } from "@pages/Settings"
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
  private state: TStoreState

  constructor() {
    super()
    this.state = initialState
    this.registerEventListener({ eventName: "STORE_STATE_UPDATED", eventListener: () => {} })
  }

  public getState() {
    return this.state
  }

  public setState<TKey extends keyof TStoreState>(key: TKey, value: TStoreState[TKey]) {
    this.state[key] = value
    this.emitEvent({ eventName: "STORE_STATE_UPDATED", eventListenerParams: null })
  }
}

export const store = new Store()

type TBlockToBeWrappedWithStore = typeof _Settings

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
            this.eventBus.emitEvent({ eventName: "COMPONENT_DID_UPDATE", eventListenerParams: null })
            this.eventBus.emitEvent({ eventName: "RERENDER", eventListenerParams: null })
          },
        })
      }
    }
  }
}
