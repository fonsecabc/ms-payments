import { MakeHttpRequestUsecase } from '@/domain/usecases'

import axios from 'axios'

export class MakeHttpRequestService implements MakeHttpRequestUsecase {
  async makeRequest<T = any>(params: MakeHttpRequestUsecase.Params): Promise<MakeHttpRequestUsecase.Response> {
    try {
      const response = await axios.request<T>(params)

      return { statusCode: response.status, body: response.data }
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
}
