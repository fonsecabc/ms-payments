import { routes } from './config'
import { defineHttpService } from './adapters'

export const user = defineHttpService(routes)
