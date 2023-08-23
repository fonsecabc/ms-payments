import { OrderNutritionalRoutineService } from '../../../../application/services'
import { EvaluationRepositoryFactory, PaymentProcessorRepositoryFactory } from '../..'
import { variables } from '../../../config'

export class OrderNutritionalRoutineServiceFactory {
  private static instance: OrderNutritionalRoutineServiceFactory

  public static getInstance(): OrderNutritionalRoutineServiceFactory {
    if (!this.instance) {
      this.instance = new OrderNutritionalRoutineServiceFactory()
    }

    return this.instance
  }

  public make(): OrderNutritionalRoutineService {
    return new OrderNutritionalRoutineService(
      PaymentProcessorRepositoryFactory.getInstance().make(),
      EvaluationRepositoryFactory.getInstance().make(),
      variables.nutritionalRoutineValue,
      variables.nutritionalRoutineSplitValue,
      variables.nutritionalRoutineSplitRecipientUid
    )
  }
}
