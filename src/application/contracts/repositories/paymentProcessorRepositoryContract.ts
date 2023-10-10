import { PaymentMethod } from '@/domain/enums'
import { Card, Subscription } from '@/domain/entities'

export interface PaymentProcessorRepositoryContract {
  createSubscription(params: PaymentProcessorRepositoryContract.CreateSubscription.Params): Promise<PaymentProcessorRepositoryContract.CreateSubscription.Response>
  cancelSubscription(params: PaymentProcessorRepositoryContract.CancelSubscription.Params): Promise<PaymentProcessorRepositoryContract.CancelSubscription.Response>
  orderNutritionalRoutine(params: PaymentProcessorRepositoryContract.OrderNutritionalRoutine.Params): Promise<PaymentProcessorRepositoryContract.OrderNutritionalRoutine.Response>
  closeOrder(params: PaymentProcessorRepositoryContract.CloseOrder.Params): Promise<PaymentProcessorRepositoryContract.CloseOrder.Response>
}

export namespace PaymentProcessorRepositoryContract {
  export namespace CreateSubscription {
    export type Params = {
      customerUid: string
      planUid: string
      paymentMethod: PaymentMethod
      card: Card
      discountId?: string
    }

    export type Response = Subscription
  }

  export namespace CancelSubscription {
    export type Params = {
      subscriptionUid: string
    }

    export type Response = Subscription
  }

  export namespace OrderNutritionalRoutine {
    export type Params = {
      customerUid: string
      paymentMethod: PaymentMethod
      value: number
      card?: Card
      splitValue: number
      splitRecipientUid: string
    }

    export type Response = {
      id: string
      status: string
      pixQrCode?: string
      pixPaymentLink?: string
    }
  }

  export namespace CloseOrder {
    export type Params = {
      orderUid: string
      status: string
    }

    export type Response = boolean
  }

  export namespace MakeRequest {
    export type Params = {
      path: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      body?: any
    }

    export type Response<T = any> = {
      statusCode: number
      body?: T
    }
  }
}
