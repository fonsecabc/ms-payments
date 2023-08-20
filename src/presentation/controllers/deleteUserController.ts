import {
    DeleteUserValidatorFactory,
    DeleteUserServiceFactory,
} from '../../main/factories'
import { NotFoundError } from '../../domain/errors'
import { handleErrorService } from '../../application/services'
import { HttpResponse, badRequest, invalidParams, notFound, success } from '../helpers'

type Request = {
    uid: string
}

export async function deleteUserController(request: Request): Promise<HttpResponse<true | Error>> {
    try {
        const isValid = await DeleteUserValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof Error) return invalidParams(isValid)

        const isDeleted = await DeleteUserServiceFactory.getInstance().make().perform(request)
        if (!isDeleted) return notFound(new NotFoundError('user'))

        return success(isDeleted)
    } catch (err: any) {
        const error = await handleErrorService({ err: err.message })

        return badRequest(error)
    }
}
