export interface UpdateUserUsecase {
    perform(params: UpdateUserUsecase.Params): Promise<UpdateUserUsecase.Response>
}
export namespace UpdateUserUsecase {
    export type Params = {
        uid: string
        attrs: object
    }

    export type Response = boolean
}
