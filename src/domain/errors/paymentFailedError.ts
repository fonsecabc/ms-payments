export class PaymentFailedError extends Error {
  constructor(name: string) {
    super(`Payment for ${name} failed!!`)
    this.name = 'PaymentFailedError'
  }
}
