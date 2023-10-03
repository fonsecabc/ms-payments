import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { PaymentMethod } from '@/domain/enums'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
//import { OrderNutritionalRoutineServiceFactory } from '@/main/factories/services'
import { OrderNutritionalRoutineValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  customerUid: string
  evaluationUid: string
  paymentMethod: PaymentMethod
}

export async function orderNutritionalRoutineController(request: Request): Promise<HttpResponse<{ id: string } | Error>> {
  const isValid = await OrderNutritionalRoutineValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  //const order = await OrderNutritionalRoutineServiceFactory.getInstance().make().perform(request)
  const order: any = 1
  if (order instanceof NotFoundError) return notFound(order)

  return order instanceof Error ? badRequest(order) : success(order)
}
