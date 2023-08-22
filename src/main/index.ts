import { routes } from './config'
import { defineHttpService } from './adapters'

export const payments = defineHttpService(routes)
