import { SubscriptionStatus } from '../../../domain/enums'
import { CancelSubscriptionUsecase } from '../../../domain/usecases'
import { PaymentProcessorRepositoryContract, UserRepositoryContract } from '../../contracts'

export class CancelSubscriptionService implements CancelSubscriptionUsecase {
  constructor(
    private readonly paymentProccesorRepository: PaymentProcessorRepositoryContract,
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform(params: CancelSubscriptionUsecase.Params): Promise<CancelSubscriptionUsecase.Response> {
    const { subscriptionUid, userUid } = params

    const isCanceled = await this.paymentProccesorRepository.cancelSubscription({ subscriptionUid })

    await this.userRepository.updateSubscriptionStatus({ userUid, subscriptionStatus: SubscriptionStatus.CANCELED })

    return isCanceled
  }
}
