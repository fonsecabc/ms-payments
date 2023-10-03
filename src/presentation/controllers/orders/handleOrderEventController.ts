import { HttpResponse, success } from '@/presentation/helpers'
import { HandleOrderEventServiceFactory } from '@/main/factories/services'

type Request = any

export async function handleOrderEventController(request: Request): Promise<HttpResponse<boolean | Error>> {
  const eventHandled = await HandleOrderEventServiceFactory.getInstance().make().perform(request)

  return success(eventHandled)
}
