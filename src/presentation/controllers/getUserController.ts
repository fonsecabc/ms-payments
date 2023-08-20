import {
    GetUserValidatorFactory,
    GetUserServiceFactory,
} from '../../main/factories'
import { GetQuery, User } from '../../domain/entities'
import { GetType } from '../../domain/enums'
import { InvalidParamError } from '../errors'
import { NotFoundError } from '../../domain/errors'
import { handleErrorService } from '../../application/services'
import { HttpResponse, badRequest, invalidParams, notFound, success } from '../helpers'

type Request = {
    uid?: string
    type: GetType
    query?: GetQuery
}

export async function getUserController(request: Request): Promise<HttpResponse<User | User[] | Error>> {
    try {
        const isValid = await GetUserValidatorFactory.getInstance().make().validate(request)
        if (isValid instanceof Error) return invalidParams(isValid)

        const users = await GetUserServiceFactory.getInstance().make().perform(request)
        if (users instanceof InvalidParamError) return invalidParams(users)
        if (users instanceof NotFoundError) return notFound(users)

        return success(users)
    } catch (err: any) {
        const error = await handleErrorService({ err: err.message })

        return badRequest(error)
    }
}
