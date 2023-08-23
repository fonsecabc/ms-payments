import { initializeApp } from './app'
import * as controllers from '../presentation/controllers'

const event = controllers.createSubscriptionController

initializeApp()

const request: any = {
}

event(request).then(console.log)
