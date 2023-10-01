import { variables } from '@/main/config'
import { PaymentProcessorRepository } from '@/infra/repositories'

export class PaymentProcessorRepositoryFactory {
  private static instance: PaymentProcessorRepositoryFactory

  public static getInstance(): PaymentProcessorRepositoryFactory {
    if (!this.instance) {
      this.instance = new PaymentProcessorRepositoryFactory()
    }

    return this.instance
  }

  public make(): PaymentProcessorRepository {
    return new PaymentProcessorRepository(
      variables.paymentProcessorApiKey,
      variables.paymentProcessorApiUrl,
      variables.monthlySubscriptionId,
    )
  }
}
