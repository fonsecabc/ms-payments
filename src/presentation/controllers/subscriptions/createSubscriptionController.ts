import { HttpResponse, badRequest, invalidParams, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError } from '@/domain/errors'
import { Card, Subscription } from '@/domain/entities'
import { PaymentMethod, SubscriptionType } from '@/domain/enums'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { CreateSubscriptionServiceFactory } from '@/main/factories/services'
import { CreateSubscriptionValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  customerUid: string
  subscriptionType: SubscriptionType
  paymentMethod: PaymentMethod
  card: Card
  discountId?: string
}

export async function createSubscriptionController(request: Request): Promise<HttpResponse<Subscription | Error>> {
  const isValid = await CreateSubscriptionValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const tokenInfo = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (tokenInfo instanceof InvalidParamError) return unathorized(tokenInfo)

  const subscription = await CreateSubscriptionServiceFactory.getInstance().make().perform({
    ...request,
    userUid: tokenInfo.uid,
  })
  if (subscription instanceof InvalidParamError) return invalidParams(subscription)

  return subscription instanceof Error ?
    badRequest(subscription) :
    success(subscription)
}
