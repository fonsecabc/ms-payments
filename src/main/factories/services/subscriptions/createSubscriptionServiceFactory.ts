import { variables } from '@/main/config'
import { CreateSubscriptionService } from '@/application/services'
import { PaymentProcessorRepositoryFactory, UserRepositoryFactory } from '@/main/factories/repositories'

export class CreateSubscriptionServiceFactory {
  private static instance: CreateSubscriptionServiceFactory

  public static getInstance(): CreateSubscriptionServiceFactory {
    if (!this.instance) {
      this.instance = new CreateSubscriptionServiceFactory()
    }

    return this.instance
  }

  public make(): CreateSubscriptionService {
    return new CreateSubscriptionService(
      PaymentProcessorRepositoryFactory.getInstance().make(),
      UserRepositoryFactory.getInstance().make(),
      variables.monthlySubscriptionId,
      variables.yearlySubscriptionId,
    )
  }
}
