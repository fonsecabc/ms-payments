export interface DeleteUserUsecase {
    perform(params: DeleteUserUsecase.Params): Promise<DeleteUserUsecase.Response>
}
export namespace DeleteUserUsecase {
    export type Params = {
        uid: string
    }

    export type Response = boolean
}
