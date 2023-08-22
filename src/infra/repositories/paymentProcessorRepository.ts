import { PaymentProcessorRepositoryContract } from '../../application/contracts'

import axios from 'axios'

export class PaymentProcessorRepository implements PaymentProcessorRepositoryContract {
  constructor(
    private readonly paymentProcessorApiKey: string,
    private readonly paymentProcessorApiUrl: string
  ) {}

  async createCustomer({ email, userUid }: PaymentProcessorRepositoryContract.CreateCustomer.Params):
  Promise<PaymentProcessorRepositoryContract.CreateCustomer.Response> {
    const response = await this.makeRequest({
      path: 'customers',
      method: 'POST',
      body: {
        email,
        name: `${userUid}-${email}`,
      }
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
      throw new Error(error)
    }
  }
}
