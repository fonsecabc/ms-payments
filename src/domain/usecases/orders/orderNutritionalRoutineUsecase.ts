import { Card } from '../../entities'
import { PaymentMethod } from '../../enums'

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
        charges: object[]
        pixQrCode?: string
    } | Error
}
