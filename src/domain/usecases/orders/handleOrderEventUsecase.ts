import { PaymentStatus } from '../../enums'

export interface HandleOrderEventUsecase {
  perform(params: HandleOrderEventUsecase.Params): Promise<HandleOrderEventUsecase.Response>
}

export namespace HandleOrderEventUsecase {
  export type Params = {
    id: string
    status: PaymentStatus
  }

  export type Response = true | Error
}
