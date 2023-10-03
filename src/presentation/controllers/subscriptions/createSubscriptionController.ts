import { HttpResponse, badRequest, invalidParams, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError } from '@/domain/errors'
import { Card, Discount, Subscription } from '@/domain/entities'
import { PaymentMethod, SubscriptionType } from '@/domain/enums'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { CreateSubscriptionServiceFactory } from '@/main/factories/services'
import { CreateSubscriptionValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  userUid: string
  customerUid: string
  subscriptionType: SubscriptionType
  paymentMethod: PaymentMethod
  card: Card
  discounts?: Discount[]
}

export async function createSubscriptionController(request: Request): Promise<HttpResponse<Subscription | Error>> {
  const isValid = await CreateSubscriptionValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const subscription = await CreateSubscriptionServiceFactory.getInstance().make().perform(request)
  if (subscription instanceof InvalidParamError) return invalidParams(subscription)

  return subscription instanceof Error ?
    badRequest(subscription) :
    success(subscription)
}
