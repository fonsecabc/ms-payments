import { variables } from '@/main/config'
import { UserRepositoryFactory } from '@/main/factories/repositories'
import { HandleInvoiceEventService } from '@/application/services'

export class HandleInvoiceEventServiceFactory {
  private static instance: HandleInvoiceEventServiceFactory

  public static getInstance(): HandleInvoiceEventServiceFactory {
    if (!this.instance) {
      this.instance = new HandleInvoiceEventServiceFactory()
    }

    return this.instance
  }

  public make(): HandleInvoiceEventService {
    return new HandleInvoiceEventService(
      UserRepositoryFactory.getInstance().make(),
      variables.monthlySubscriptionId
    )
  }
}
