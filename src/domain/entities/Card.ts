import { Address } from './Address'

export interface Card {
  number: string
  holderName: string
  expirationMonth: number
  expirationYear: number
  cvv: string
  billingAddress: Address
}
