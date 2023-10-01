import {
  VerifyAccessTokenServiceFactory,
  OrderNutritionalRoutineServiceFactory,
  OrderNutritionalRoutineValidatorFactory,
} from '@/main/factories'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { PaymentMethod } from '@/domain/enums'
import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'

type Request = {
  accessToken: string
  customerUid: string
  evaluationUid: string
  paymentMethod: PaymentMethod
}

export async function orderNutritionalRoutineController(request: Request): Promise<HttpResponse<{ id: string } | Error>> {
  const isValid = await OrderNutritionalRoutineValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) unathorized(isTokenValid)

  const order = await OrderNutritionalRoutineServiceFactory.getInstance().make().perform(request)
  if (order instanceof NotFoundError) return notFound(order)

  return order instanceof Error ? badRequest(order) : success(order)
}
