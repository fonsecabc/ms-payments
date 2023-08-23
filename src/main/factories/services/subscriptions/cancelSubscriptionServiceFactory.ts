import { CancelSubscriptionService } from '../../../../application/services'
import { PaymentProcessorRepositoryFactory, UserRepositoryFactory } from '../..'

export class CancelSubscriptionServiceFactory {
  private static instance: CancelSubscriptionServiceFactory

  public static getInstance(): CancelSubscriptionServiceFactory {
    if (!this.instance) {
      this.instance = new CancelSubscriptionServiceFactory()
    }

    return this.instance
  }

  public make(): CancelSubscriptionService {
    return new CancelSubscriptionService(
      PaymentProcessorRepositoryFactory.getInstance().make(),
      UserRepositoryFactory.getInstance().make(),
    )
  }
}
