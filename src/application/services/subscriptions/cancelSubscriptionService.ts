import { SubscriptionStatus } from '../../../domain/enums'
import { CouldNotError } from '../../../domain/errors'
import { CancelSubscriptionUsecase } from '../../../domain/usecases'
import { PaymentProcessorRepositoryContract, UserRepositoryContract } from '../../contracts'

export class CancelSubscriptionService implements CancelSubscriptionUsecase {
  constructor(
    private readonly paymentProccesorRepository: PaymentProcessorRepositoryContract,
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform(params: CancelSubscriptionUsecase.Params): Promise<CancelSubscriptionUsecase.Response> {
    const { subscriptionUid, userUid } = params

    const canceledSubscription = await this.paymentProccesorRepository.cancelSubscription({ subscriptionUid })

    const isAttached = await this.userRepository.attachSubscriptionToUser({ userUid, subscription: canceledSubscription })
    if (!isAttached) return new CouldNotError('attach subscription to user')

    return canceledSubscription.status === SubscriptionStatus.CANCELED ?
      true :
      new CouldNotError('cancel subscription')
  }
}
