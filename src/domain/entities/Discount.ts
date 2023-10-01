import { DiscountType } from '@/domain/enums'

export interface Discount {
  value: number
  type: DiscountType
}
