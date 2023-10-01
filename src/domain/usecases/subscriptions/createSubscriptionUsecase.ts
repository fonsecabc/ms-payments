import { Card, Discount, Subscription } from '@/domain/entities'
import { PaymentMethod, SubscriptionType } from '@/domain/enums'

export interface CreateSubscriptionUsecase {
    subscriptionMap: Map<SubscriptionType, string>
    perform(params: CreateSubscriptionUsecase.Params): Promise<CreateSubscriptionUsecase.Response>
}

export namespace CreateSubscriptionUsecase {
    export type Params = {
        customerUid: string
        userUid: string
        subscriptionType: SubscriptionType
        paymentMethod: PaymentMethod
        card: Card
        discounts?: Discount[]
    }

    export type Response = Subscription | Error
}
