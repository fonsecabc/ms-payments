import {
    CreateUserValidatorFactory,
    CreateUserServiceFactory,
} from '../../main/factories'
import { User } from '../../domain/entities'
import { handleErrorService } from '../../application/services'
import { HttpResponse, badRequest, invalidParams, success } from '../helpers'

type Request = {
    email: string
    password: string
}

export async function createUserController(request: Request): Promise<HttpResponse<User | Error>> {
    try {
        const isValid = await CreateUserValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof Error) return invalidParams(isValid)

        console.log('user')
        const user = await CreateUserServiceFactory.getInstance().make().perform(request)
        console.log(user)

        return success(user)
    } catch (err: any) {
        const error = await handleErrorService({ err: err.message })

        return badRequest(error)
    }
}
