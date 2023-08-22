import { PaymentProcessorRepositoryFactory } from '../..'
import { CreateCustomerService } from '../../../../application/services'

export class CreateCustomerServiceFactory {
  private static instance: CreateCustomerServiceFactory

  public static getInstance(): CreateCustomerServiceFactory {
    if (!this.instance) {
      this.instance = new CreateCustomerServiceFactory()
    }

    return this.instance
  }

  public make(): CreateCustomerService {
    return new CreateCustomerService(
      PaymentProcessorRepositoryFactory.getInstance().make(),
    )
  }
}
