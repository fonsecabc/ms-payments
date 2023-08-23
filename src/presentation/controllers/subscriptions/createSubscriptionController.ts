import {
  CreateSubscriptionValidatorFactory,
  CreateSubscriptionServiceFactory,
  VerifyAccessTokenServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { Card, Discount } from '../../../domain/entities'
import { HttpResponse, invalidParams, success, unathorized } from '../../helpers'
import { PaymentMethod, SubscriptionType } from '../../../domain/enums'

type Request = {
  accessToken: string
  userUid: string
  customerUid: string
  subscriptionType: SubscriptionType
  paymentMethod: PaymentMethod
  card: Card
  discounts?: Discount[]
}

export async function createSubscriptionController(request: Request): Promise<HttpResponse<{ id: string } | Error>> {
  const isValid = await CreateSubscriptionValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) unathorized(isTokenValid)

  const subscription = await CreateSubscriptionServiceFactory.getInstance().make().perform(request)

  return success(subscription)
}
