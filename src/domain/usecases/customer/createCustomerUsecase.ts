import { Address, Customer } from '../../entities'
import { DocumentType } from '../../enums'


export interface CreateCustomerUsecase {
    perform(params: CreateCustomerUsecase.Params): Promise<CreateCustomerUsecase.Response>
}

export namespace CreateCustomerUsecase {
    export type Params = {
        userUid: string
        email: string
        document: string
        documentType: DocumentType
        address: Address
    }

    export type Response = Customer
}
