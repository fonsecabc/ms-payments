import { Card } from '@/domain/entities'
import { PaymentMethod } from '@/domain/enums'

export interface OrderNutritionalRoutineUsecase {
    perform(params: OrderNutritionalRoutineUsecase.Params): Promise<OrderNutritionalRoutineUsecase.Response>
}

export namespace OrderNutritionalRoutineUsecase {
    export type Params = {
        customerUid: string
        evaluationUid: string
        paymentMethod: PaymentMethod
        card?: Card
    }

    export type Response = {
        id: string
        status: string
        pixQrCode?: string
        pixPaymentLink?: string
    } | Error
}
