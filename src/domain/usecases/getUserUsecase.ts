import { GetType } from '../enums'
import { User, GetQuery } from '../entities'

export interface GetUserUsecase {
    perform(params: GetUserUsecase.Params): Promise<GetUserUsecase.Response>
}
export namespace GetUserUsecase {
    export type Params = {
        uid?: string
        type: GetType
        query?: GetQuery
    }

    export type Response = User | User[] | Error
}
