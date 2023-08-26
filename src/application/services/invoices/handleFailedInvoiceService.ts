import { CouldNotError } from '../../../domain/errors'
import { UserRepositoryContract } from '../../contracts'
import { HandleInvoiceEventUsecase } from '../../../domain/usecases'
import { PaymentStatus, SubscriptionStatus, SubscriptionType } from '../../../domain/enums'

export class HandleInvoiceEventService implements HandleInvoiceEventUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly monthlySubscriptionId: string,
  ) { }

  async perform(params: HandleInvoiceEventUsecase.Params): Promise<HandleInvoiceEventUsecase.Response> {
    const webhookInvoice = params.data
    const webhookSubscription = params.data.subscription

    const priceInCents = webhookSubscription.items.reduce((totalPrice: number, item: any) => totalPrice + item.pricing_scheme.price, 0)
    const discount = webhookSubscription.discounts[0].value
    const subscriptionType = webhookSubscription.plan.id === this.monthlySubscriptionId ? SubscriptionType.MONTHLY : SubscriptionType.YEARLY

    const event = {
      invoice: {
        id: webhookInvoice.id,
        status: webhookInvoice.status,
      },
      subscription: {
        uid: webhookSubscription.id,
        startedAt: webhookSubscription.start_at,
        nextBillingAt: webhookSubscription.next_billing_at,
        type: subscriptionType,
        status: webhookSubscription.status,
        paymentMethod: webhookSubscription.payment_method,
        price: priceInCents * 100,
        discountPercentage: discount,
      },
    }

    const { invoice, subscription } = event

    const isUpdated = await this.userRepository.updateSubscriptionBySubscriptionUid({
      subscription: {
        ...subscription,
        status: invoice.status === PaymentStatus.FAILED ? SubscriptionStatus.PAYMENT_FAILED : SubscriptionStatus.ACTIVE,
      },
    })

    return isUpdated || new CouldNotError('update subscription')
  }
}
