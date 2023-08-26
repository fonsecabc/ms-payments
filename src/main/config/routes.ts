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
    path: '/invoice/handle-event',
    method: 'POST',
    handler: controllers.handleInvoiceEventController,
  },
  {
    path: '/order/nutritional-routine',
    method: 'POST',
    handler: controllers.orderNutritionalRoutineController,
  },
  {
    path: '/order/handle-event',
    method: 'POST',
    handler: controllers.handleOrderEventController,
  },
]

