import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'

const requiredFields: string[] = [
  'accessToken',
  'customerUid',
  'subscriptionType',
  'paymentMethod',
  'card',
  'card.number',
  'card.holderName',
  'card.expirationMonth',
  'card.expirationYear',
  'card.cvv',
  'card.billingAddress',
  'card.billingAddress.country',
  'card.billingAddress.state',
  'card.billingAddress.city',
  'card.billingAddress.zipCode',
  'card.billingAddress.street',
  'card.billingAddress.streetNumber',
  'card.billingAddress.neighborhood',
]

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
    for (const field of requiredFields) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
