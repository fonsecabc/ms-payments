import {
  CreateCustomerValidatorFactory,
  CreateCustomerServiceFactory,
} from '../../../main/factories'
import { Address, Customer } from '../../../domain/entities'
import { HttpResponse, invalidParams, success } from '../../helpers'
import { DocumentType } from '../../../domain/enums'

type Request = {
  userUid: string
  email: string
  document: string
  documentType: DocumentType
  address: Address
}

export async function createCustomerController(request: Request): Promise<HttpResponse<Customer | Error>> {
  const isValid = await CreateCustomerValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof Error) return invalidParams(isValid)

  const customer = await CreateCustomerServiceFactory.getInstance().make().perform(request)

  return success(customer)
}
