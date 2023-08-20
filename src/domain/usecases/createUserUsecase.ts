import { User } from '../entities'

export interface CreateUserUsecase {
    perform(params: CreateUserUsecase.Params): Promise<CreateUserUsecase.Response>
}

export namespace CreateUserUsecase {
    export type Params = {
        email: string
        password: string
    }

    export type Response = User
}
