import { MakeHttpRequestService } from '../../../../application/services'

export class MakeHttpRequestServiceFactory {
  private static instance: MakeHttpRequestServiceFactory

  public static getInstance(): MakeHttpRequestServiceFactory {
    if (!this.instance) {
      this.instance = new MakeHttpRequestServiceFactory()
    }

    return this.instance
  }

  public make(): MakeHttpRequestService {
    return new MakeHttpRequestService()
  }
}
