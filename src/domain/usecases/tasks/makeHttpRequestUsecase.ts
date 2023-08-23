export interface MakeHttpRequestUsecase {
    makeRequest(params: MakeHttpRequestUsecase.Params): Promise<MakeHttpRequestUsecase.Response>
}

export namespace MakeHttpRequestUsecase {
    export type Params = {
        url: string
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'
        body?: any
        headers?: any
    }

    export type Response<T = any> = {
        statusCode: number
        body?: T
    }
}
