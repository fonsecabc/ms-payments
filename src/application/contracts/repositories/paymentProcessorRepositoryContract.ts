import { PaymentMethod } from '../../../domain/enums'
import { Card, Discount } from '../../../domain/entities'

export interface PaymentProcessorRepositoryContract {
    createSubscription(params: PaymentProcessorRepositoryContract.CreateSubscription.Params): Promise<PaymentProcessorRepositoryContract.CreateSubscription.Response>
}

export namespace PaymentProcessorRepositoryContract {
    export namespace CreateSubscription {
        export type Params = {
            customerUid: string
            planUid: string
            paymentMethod: PaymentMethod
            card: Card
            discounts?: Discount[]
        }

        export type Response = {
            id: string
        }
    }

    export namespace MakeRequest {
        export type Params = {
            path: string
            method: 'GET' | 'POST' | 'PUT' | 'DELETE'
            body?: any
        }

        export type Response<T = any> = {
            statusCode: number
            body?: T
        }
    }
}
