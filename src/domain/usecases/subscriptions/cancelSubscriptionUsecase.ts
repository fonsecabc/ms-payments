export interface CancelSubscriptionUsecase {
    perform(params: CancelSubscriptionUsecase.Params): Promise<CancelSubscriptionUsecase.Response>
}

export namespace CancelSubscriptionUsecase {
    export type Params = {
        userUid: string
        subscriptionUid: string
    }

    export type Response = boolean
}
