import { PaymentProcessorRepositoryContract } from '../../application/contracts'

import axios from 'axios'

export class PaymentProcessorRepository implements PaymentProcessorRepositoryContract {
  constructor(
    private readonly paymentProcessorApiKey: string,
    private readonly paymentProcessorApiUrl: string
  ) {}

  async createSubscription(params: PaymentProcessorRepositoryContract.CreateSubscription.Params):
  Promise<PaymentProcessorRepositoryContract.CreateSubscription.Response> {
    const { customerUid, planUid, paymentMethod, card, discounts } = params
    const { number, holderName, expirationMonth, expirationYear, billingAddress, cvv } = card

    const response = await this.makeRequest({
      path: 'subscriptions',
      method: 'POST',
      body: {
        customer_id: customerUid,
        plan_id: planUid,
        payment_method: paymentMethod,
        card: {
          number,
          cvv,
          holder_name: holderName,
          exp_month: expirationMonth,
          exp_year: expirationYear,
          billing_address: {
            line_1: billingAddress.line1,
            line_2: billingAddress.line2,
            zip_code: billingAddress.zipCode,
            city: billingAddress.city,
            state: billingAddress.state,
            country: billingAddress.country,
          },
        },
        discounts: discounts?.map((discount) => ({
          ...discount,
          discount_type: discount.type,
        })),
      },
    })

    return response.body
  }

  private async makeRequest<T = any>({ path, body, method }: PaymentProcessorRepositoryContract.MakeRequest.Params): Promise<PaymentProcessorRepositoryContract.MakeRequest.Response> {
    try {
      const url = `${this.paymentProcessorApiUrl}/${path}`
      const response = await axios.request<T>({
        url,
        method,
        [method === 'GET' ? 'params' : 'data']: body,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': 'Basic ' + this.paymentProcessorApiKey,
        },
      })

      return { statusCode: response.status, body: response.data }
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
}
