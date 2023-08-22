import { initializeApp } from './app'
import * as controllers from '../presentation/controllers'

const event = controllers.createCustomerController

initializeApp()

const request: any = {
  email: 'caiobragadafonseca@gmail.com',
  userUid: '123',
}

event(request).then(console.log)
