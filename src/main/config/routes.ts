import { Routes } from '../../presentation/helpers'
import * as controllers from '../../presentation/controllers'

export const routes: Routes[] = [
  {
    path: '/customer/create',
    method: 'POST',
    handler: controllers.createCustomerController,
  },
]

