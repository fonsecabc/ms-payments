import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class CreateSubscriptionValidatorFactory {
  private static instance: CreateSubscriptionValidatorFactory

  public static getInstance(): CreateSubscriptionValidatorFactory {
    if (!this.instance) {
      this.instance = new CreateSubscriptionValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['userUid', 'accessToken', 'customerUid', 'subscriptionType', 'paymentMethod', 'card']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
