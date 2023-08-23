export interface AttachSubscriptionToUserUsecase {
    perform(params: AttachSubscriptionToUserUsecase.Params): Promise<AttachSubscriptionToUserUsecase.Response>
}

export namespace AttachSubscriptionToUserUsecase {
    export type Params = {
        userUid: string
        subscriptionUid: string
    }

    export type Response = boolean
}
