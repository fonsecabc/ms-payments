import {
    ValidatorsInterface,
    ValidationComposite,
    RequireParamValidation,
} from '../../../infra/validators'

export class DeleteUserValidatorFactory {
    private static instance: DeleteUserValidatorFactory

    public static getInstance(): DeleteUserValidatorFactory {
        if (!this.instance) {
            this.instance = new DeleteUserValidatorFactory()
        }

        return this.instance
    }

    public make(): ValidationComposite {
        const validations: ValidatorsInterface[] = []
        for (const field of ['uid']) {
            validations.push(new RequireParamValidation(field))
        }

        return new ValidationComposite(validations)
    }
}
