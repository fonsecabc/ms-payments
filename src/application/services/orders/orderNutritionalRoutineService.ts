import { OrderNutritionalRoutineUsecase } from '../../../domain/usecases'
import { EvaluationRepositoryContract, PaymentProcessorRepositoryContract } from '../../contracts'

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

    const value = this.nutritionalRoutineValue
    const splitValue = this.nutritionalRoutineSplitValue
    const splitRecipientUid = this.nutritionalRoutineSplitRecipientUid

    const order = await this.paymentProccesorRepository.orderNutritionalRoutine({ customerUid, paymentMethod, card, value, splitValue, splitRecipientUid })

    await this.evaluationRepository.attachNutritionalRoutineOrderToEvaluation({ evaluationUid, orderUid: order.id })

    return order
  }
}
