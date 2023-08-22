import { CreateCustomerUsecase } from '../../../domain/usecases'
import { PaymentProcessorRepositoryContract } from '../../contracts'

export class CreateCustomerService implements CreateCustomerUsecase {
  constructor(
    private readonly paymentProccesorRepository: PaymentProcessorRepositoryContract,
  ) { }

  async perform(params: CreateCustomerUsecase.Params): Promise<CreateCustomerUsecase.Response> {
    return await this.paymentProccesorRepository.createCustomer(params)
  }
}
