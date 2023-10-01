import { OrderNutritionalRoutineUsecase } from '@/domain/usecases'
import { NotFoundError, PaymentFailedError } from '@/domain/errors'
import { EvaluationRepositoryContract, PaymentProcessorRepositoryContract } from '@/application/contracts/repositories'

export class OrderNutritionalRoutineService implements OrderNutritionalRoutineUsecase {
  constructor(
    private readonly paymentProccesorRepository: PaymentProcessorRepositoryContract,
    private readonly evaluationRepository: EvaluationRepositoryContract,
    private readonly nutritionalRoutineValue: number,
    private readonly nutritionalRoutineSplitValue: number,
    private readonly nutritionalRoutineSplitRecipientUid: string
  ) { }

  async perform(params: OrderNutritionalRoutineUsecase.Params): Promise<OrderNutritionalRoutineUsecase.Response> {
    const { customerUid, evaluationUid, paymentMethod, card } = params

    const evaluation = await this.evaluationRepository.getByUid({ uid: evaluationUid })
    if (!evaluation) return new NotFoundError('evaluation')

    const value = this.nutritionalRoutineValue
    const splitValue = this.nutritionalRoutineSplitValue
    const splitRecipientUid = this.nutritionalRoutineSplitRecipientUid

    const order = await this.paymentProccesorRepository.orderNutritionalRoutine({
      customerUid,
      paymentMethod,
      card,
      value,
      splitValue,
      splitRecipientUid,
    })

    await this.evaluationRepository.attachNutritionalRoutineOrderToEvaluation({
      evaluationUid,
      orderUid: order.id,
      paymentStatus: order.status,
    })

    if (order.status === 'failed') {
      await this.paymentProccesorRepository.closeOrder({ orderUid: order.id, status: order.status })
      return new PaymentFailedError('nutritional routine')
    }

    return {
      id: order.id,
      status: order.status,
      pixQrCode: order?.pixQrCode,
    }
  }
}
