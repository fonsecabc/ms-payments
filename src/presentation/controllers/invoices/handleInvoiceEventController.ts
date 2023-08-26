import {
  HandleInvoiceEventServiceFactory,
} from '../../../main/factories'
import { CouldNotError } from '../../../domain/errors'
import { HttpResponse, badRequest, success } from '../../helpers'

type Request = any

export async function handleInvoiceEventController(request: Request): Promise<HttpResponse<true | Error>> {
  const eventHandled = await HandleInvoiceEventServiceFactory.getInstance().make().perform(request)
  if (eventHandled instanceof CouldNotError) return badRequest(eventHandled)

  return success(eventHandled)
}
