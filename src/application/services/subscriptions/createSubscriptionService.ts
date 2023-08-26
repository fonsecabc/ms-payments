import { SubscriptionType } from '../../../domain/enums'
import { InvalidParamError } from '../../../presentation/errors'
import { CreateSubscriptionUsecase } from '../../../domain/usecases'
import { PaymentProcessorRepositoryContract, UserRepositoryContract } from '../../contracts'
import { CouldNotError } from '../../../domain/errors'

export class CreateSubscriptionService implements CreateSubscriptionUsecase {
  constructor(
    private readonly paymentProccesorRepository: PaymentProcessorRepositoryContract,
    private readonly userRepository: UserRepositoryContract,
    private readonly monthlySubscriptionId: string,
    private readonly yearlySubscriptionId: string
  ) { }

  subscriptionMap: Map<CreateSubscriptionUsecase.Params['subscriptionType'], string> = new Map([
    [SubscriptionType.MONTHLY, this.monthlySubscriptionId],
    [SubscriptionType.YEARLY, this.yearlySubscriptionId],
  ])

  async perform(params: CreateSubscriptionUsecase.Params): Promise<CreateSubscriptionUsecase.Response> {
    const { subscriptionType, userUid } = params

    const planUid = this.subscriptionMap.get(subscriptionType)
    if (!planUid) return new InvalidParamError('subscription Type')

    const subscription = await this.paymentProccesorRepository.createSubscription({ ...params, planUid })

    const isAttached = await this.userRepository.attachSubscriptionToUser({ userUid, subscription })
    if (!isAttached) return new CouldNotError('attach subscription to user')

    return subscription
  }
}
