import { Subscription } from '../../../domain/entities'

export interface UserRepositoryContract {
  attachSubscriptionToUser(params: UserRepositoryContract.AttachSubscriptionToUser.Params):
  Promise<UserRepositoryContract.AttachSubscriptionToUser.Response>
  updateSubscriptionBySubscriptionUid(params: UserRepositoryContract.UpdateSubscriptionBySubscriptionUid.Params):
  Promise<UserRepositoryContract.UpdateSubscriptionBySubscriptionUid.Response>
}

export namespace UserRepositoryContract {
  export namespace AttachSubscriptionToUser {
    export type Params = {
      userUid: string
      subscription: Subscription
    }

    export type Response = boolean
  }

  export namespace UpdateSubscriptionBySubscriptionUid {
    export type Params = {
      subscription: Subscription
    }

    export type Response = boolean
  }
}
