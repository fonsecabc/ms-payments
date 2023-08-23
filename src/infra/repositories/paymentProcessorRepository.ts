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

  async cancelSubscription(params: PaymentProcessorRepositoryContract.CancelSubscription.Params):
  Promise<PaymentProcessorRepositoryContract.CancelSubscription.Response> {
    const { subscriptionUid } = params

    await this.makeRequest({
      path: `subscriptions/${subscriptionUid}`,
      method: 'DELETE',
      body: {
        cancel_pending_invoices: true,
      },
    })

    return true
  }

  async orderNutritionalRoutine(params: PaymentProcessorRepositoryContract.OrderNutritionalRoutine.Params):
  Promise<PaymentProcessorRepositoryContract.OrderNutritionalRoutine.Response> {
    const { customerUid, paymentMethod, value, card, splitValue, splitRecipientUid } = params

    const response = await this.makeRequest({
      path: 'orders',
      method: 'POST',
      body: {
        customer_id: customerUid,
        items: [{
          amount: value,
          description: 'Rotina Nutricional Stima',
          quantity: 1,
        }],
        payments: [{
          payment_method: paymentMethod,
          credit_card: card && {
            statement_descriptor: 'Rotina Nutricional Stima',
            operation_type: 'auth_and_capture',
            card: {
              number: card.number,
              cvv: card.cvv,
              holder_name: card.holderName,
              exp_month: card.expirationMonth,
              exp_year: card.expirationYear,
              billing_address: {
                line_1: card.billingAddress.line1,
                line_2: card.billingAddress.line2,
                zip_code: card.billingAddress.zipCode,
                city: card.billingAddress.city,
                state: card.billingAddress.state,
                country: card.billingAddress.country,
              },
            },
          },
          pix: {
            expires_in: 3600,
          },
          amount: value,
          split: {
            amount: splitValue,
            recipient_id: splitRecipientUid,
            type: 'percentage',
          },
        }],
        closed: true,
        antifraud_enabled: true,
      },
    })

    return response.body
  }

  private async makeRequest<T = any>({ path, body, method }: PaymentProcessorRepositoryContract.MakeRequest.Params):
  Promise<PaymentProcessorRepositoryContract.MakeRequest.Response> {
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
