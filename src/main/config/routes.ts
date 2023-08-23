import { Routes } from '../../presentation/helpers'
import * as controllers from '../../presentation/controllers'

export const routes: Routes[] = [
  {
    path: '/subscription/create',
    method: 'POST',
    handler: controllers.createSubscriptionController,
  },
  {
    path: '/subscription/cancel',
    method: 'DELETE',
    handler: controllers.cancelSubscriptionController,
  },
  {
    path: '/order/nutritional-routine',
    method: 'POST',
    handler: controllers.orderNutritionalRoutineController,
  },
]

