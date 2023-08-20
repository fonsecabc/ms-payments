import {
    ValidatorsInterface,
    ValidationComposite,
    RequireParamValidation,
} from '../../../infra/validators'


export class GetUserValidatorFactory {
    private static instance: GetUserValidatorFactory

    public static getInstance(): GetUserValidatorFactory {
        if (!this.instance) {
            this.instance = new GetUserValidatorFactory()
        }

        return this.instance
    }

    public make(): ValidationComposite {
        const validations: ValidatorsInterface[] = []
        for (const field of ['type']) {
            validations.push(new RequireParamValidation(field))
        }

        return new ValidationComposite(validations)
    }
}
