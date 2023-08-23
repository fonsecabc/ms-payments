import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '../../../../infra/validators'

export class OrderNutritionalRoutineValidatorFactory {
  private static instance: OrderNutritionalRoutineValidatorFactory

  public static getInstance(): OrderNutritionalRoutineValidatorFactory {
    if (!this.instance) {
      this.instance = new OrderNutritionalRoutineValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['customerUid', 'accessToken', 'paymentMethod', 'evaluationUid']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
