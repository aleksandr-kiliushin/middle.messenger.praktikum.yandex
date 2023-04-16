import { _Profile } from "@pages/Profile"
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

type TBlockToBeWrappedWithStore = typeof _Profile | typeof _Settings

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
      private props: Pick<TStoreState, TStoreStateKey> & TOwnProps
      constructor({ ownProps }: { ownProps: TOwnProps }) {
        const props = { ...getPropsFromStore({ storeStateKeys }), ...ownProps }
        super({ props })
        this.props = props
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
