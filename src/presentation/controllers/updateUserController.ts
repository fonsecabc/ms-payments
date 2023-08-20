import {
    UpdateUserValidatorFactory,
    UpdateUserServiceFactory,
} from '../../main/factories'
import { NotFoundError } from '../../domain/errors'
import { handleErrorService } from '../../application/services'
import { HttpResponse, badRequest, invalidParams, notFound, success } from '../helpers'

type Request = {
    uid: string
    attrs: object
}

export async function updateUserController(request: Request): Promise<HttpResponse<true | Error>> {
    try {
        const isValid = await UpdateUserValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof Error) return invalidParams(isValid)

        const isUpdated = await UpdateUserServiceFactory.getInstance().make().perform(request)
        if (!isUpdated) return notFound(new NotFoundError('user'))

        return success(isUpdated)
    } catch (err: any) {
        const error = await handleErrorService({ err: err.message })

        return badRequest(error)
    }
}
