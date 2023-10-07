import { Address } from '@/domain/entities'

export interface Card {
  number: string
  holderName: string
  expirationMonth: number
  expirationYear: number
  cvv: string
  billingAddress: Address
}
