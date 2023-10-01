import { CouldNotError } from '@/domain/errors'

export interface HandleInvoiceEventUsecase {
  perform(params: HandleInvoiceEventUsecase.Params): Promise<HandleInvoiceEventUsecase.Response>
}

export namespace HandleInvoiceEventUsecase {
  export type Params = any

  export type Response = true | CouldNotError
}
