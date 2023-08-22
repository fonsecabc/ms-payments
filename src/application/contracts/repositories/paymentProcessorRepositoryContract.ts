import { DocumentType } from '../../../domain/enums'
import { Address, Customer } from '../../../domain/entities'

export interface PaymentProcessorRepositoryContract {
    createCustomer(params: PaymentProcessorRepositoryContract.CreateCustomer.Params): Promise<PaymentProcessorRepositoryContract.CreateCustomer.Response>
}

export namespace PaymentProcessorRepositoryContract {
    export namespace CreateCustomer {
        export type Params = {
            userUid: string
            email: string
            document: string
            documentType: DocumentType
            address: Address
        }

        export type Response = Customer
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
