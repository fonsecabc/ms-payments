import {
    ValidatorsInterface,
    ValidationComposite,
    RequireParamValidation,
    EmailValidation,
} from '../../../infra/validators'

export class CreateUserValidatorFactory {
    private static instance: CreateUserValidatorFactory

    public static getInstance(): CreateUserValidatorFactory {
        if (!this.instance) {
            this.instance = new CreateUserValidatorFactory()
        }

        return this.instance
    }

    public make(): ValidationComposite {
        const validations: ValidatorsInterface[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequireParamValidation(field))
        }
        validations.push(new EmailValidation('email'))

        return new ValidationComposite(validations)
    }
}
