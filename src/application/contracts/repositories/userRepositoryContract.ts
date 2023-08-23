export interface UserRepositoryContract {
    attachSubscriptionToUser(params: UserRepositoryContract.AttachSubscriptionToUser.Params): Promise<UserRepositoryContract.AttachSubscriptionToUser.Response>
}

export namespace UserRepositoryContract {
    export namespace AttachSubscriptionToUser {
        export type Params = {
            userUid: string
            subscriptionUid: string
        }

        export type Response = boolean
    }
}
