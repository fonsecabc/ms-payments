import {
  CancelSubscriptionValidatorFactory,
  CancelSubscriptionServiceFactory,
  VerifyAccessTokenServiceFactory,
} from '../../../main/factories'
import { InvalidParamError } from '../../errors'
import { HttpResponse, invalidParams, success, unathorized } from '../../helpers'

type Request = {
  accessToken: string
  userUid: string
  subscriptionUid: string
}

export async function cancelSubscriptionController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await CancelSubscriptionValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenServiceFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) unathorized(isTokenValid)

  const subscription = await CancelSubscriptionServiceFactory.getInstance().make().perform(request)

  return success(subscription)
}
