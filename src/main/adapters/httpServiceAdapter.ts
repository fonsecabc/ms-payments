import { cors } from '../config'
import { Routes, badRequest, methodNotAllowed, undefinedRoute } from '../../presentation/helpers'

import { https, Request, Response, HttpsFunction } from 'firebase-functions'
import { handleErrorService } from '../../application/services'

export function defineHttpService(routes: Routes[]): HttpsFunction {
  return https.onRequest(
    async (req: Request, res: Response) => {
      cors(req, res, async () => {
        const getResponse = async () => {
          const request = req.method === 'GET' ? req.query : req.body
          const route = routes.find((route) => route.path === req.url)


          if (!route) return undefinedRoute()
          if (route.method !== req.method) return methodNotAllowed()

          try {
            return await route.handler(request)
          } catch (error: any) {
            const err = await handleErrorService({ err: error })
            return badRequest(err)
          }
        }

        const response = await getResponse()

        const isValid = !!(response.statusCode >= 200 && response.statusCode <= 299)
        const data = (isValid) ? response.data : { error: response.data.message }

        res.status(response.statusCode).send(data)
      })
    }
  )
}
