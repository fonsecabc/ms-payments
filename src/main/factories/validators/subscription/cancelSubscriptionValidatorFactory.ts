import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

export class CancelSubscriptionValidatorFactory {
  private static instance: CancelSubscriptionValidatorFactory

  public static getInstance(): CancelSubscriptionValidatorFactory {
    if (!this.instance) {
      this.instance = new CancelSubscriptionValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['userUid', 'accessToken', 'subscriptionUid']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
