import { HandleOrderEventService } from '@/application/services'
import { EvaluationRepositoryFactory, PaymentProcessorRepositoryFactory } from '@/main/factories/repositories'

export class HandleOrderEventServiceFactory {
  private static instance: HandleOrderEventServiceFactory

  public static getInstance(): HandleOrderEventServiceFactory {
    if (!this.instance) {
      this.instance = new HandleOrderEventServiceFactory()
    }

    return this.instance
  }

  public make(): HandleOrderEventService {
    return new HandleOrderEventService(
      PaymentProcessorRepositoryFactory.getInstance().make(),
      EvaluationRepositoryFactory.getInstance().make()
    )
  }
}
