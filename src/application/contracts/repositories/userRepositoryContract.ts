import { SubscriptionStatus } from '../../../domain/enums'

export interface UserRepositoryContract {
  attachSubscriptionToUser(params: UserRepositoryContract.AttachSubscriptionToUser.Params): Promise<UserRepositoryContract.AttachSubscriptionToUser.Response>
  updateSubscriptionStatus(params: UserRepositoryContract.UpdateSubscriptionStatus.Params): Promise<UserRepositoryContract.UpdateSubscriptionStatus.Response>
}

export namespace UserRepositoryContract {
  export namespace AttachSubscriptionToUser {
    export type Params = {
      userUid: string
      subscriptionUid: string
    }

    export type Response = boolean
  }

  export namespace UpdateSubscriptionStatus {
    export type Params = {
      userUid: string
      subscriptionStatus: SubscriptionStatus
    }

    export type Response = boolean
  }
}
