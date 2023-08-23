import { Routes } from '../../presentation/helpers'
import * as controllers from '../../presentation/controllers'

export const routes: Routes[] = [
  {
    path: '/subscription/create',
    method: 'POST',
    handler: controllers.createSubscriptionController,
  },
]

