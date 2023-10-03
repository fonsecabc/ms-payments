import { HttpResponse, invalidParams, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { CancelSubscriptionServiceFactory } from '@/main/factories/services'
import { CancelSubscriptionValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  userUid: string
  subscriptionUid: string
}

export async function cancelSubscriptionController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await CancelSubscriptionValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const subscription = await CancelSubscriptionServiceFactory.getInstance().make().perform(request)

  return success(subscription)
}
