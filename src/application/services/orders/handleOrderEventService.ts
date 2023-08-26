import { HandleOrderEventUsecase } from '../../../domain/usecases'
import { EvaluationRepositoryContract, PaymentProcessorRepositoryContract } from '../../contracts'

export class HandleOrderEventService implements HandleOrderEventUsecase {
  constructor(
    private readonly paymentProcessorRepository: PaymentProcessorRepositoryContract,
    private readonly evaluationRepository: EvaluationRepositoryContract,
  ) { }

  async perform({ id, status }: HandleOrderEventUsecase.Params): Promise<HandleOrderEventUsecase.Response> {
    await this.paymentProcessorRepository.closeOrder({ orderUid: id, status })
    await this.evaluationRepository.updateEvaluationPaymentStatusByOrderUid({ orderUid: id, paymentStatus: status })

    return true
  }
}
