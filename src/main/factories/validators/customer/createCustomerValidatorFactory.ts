import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
  EmailValidation,
} from '../../../../infra/validators'

export class CreateCustomerValidatorFactory {
  private static instance: CreateCustomerValidatorFactory

  public static getInstance(): CreateCustomerValidatorFactory {
    if (!this.instance) {
      this.instance = new CreateCustomerValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['userUid', 'email']) {
      validations.push(new RequireParamValidation(field))
    }
    validations.push(new EmailValidation('email'))

    return new ValidationComposite(validations)
  }
}
