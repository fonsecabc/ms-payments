import { User, GetQuery } from '../../../domain/entities'

export interface UserRepositoryContract {
    create(params: UserRepositoryContract.Create.Params): Promise<UserRepositoryContract.Create.Response>
    get(params: UserRepositoryContract.Get.Params): Promise<UserRepositoryContract.Get.Response>
    getList(): Promise<UserRepositoryContract.GetList.Response>
    getQuery(params: UserRepositoryContract.GetQuery.Params): Promise<UserRepositoryContract.GetQuery.Response>
    update(params: UserRepositoryContract.Update.Params): Promise<UserRepositoryContract.Update.Response>
    delete(params: UserRepositoryContract.Delete.Params): Promise<UserRepositoryContract.Delete.Response>
}

export namespace UserRepositoryContract {
    export namespace Create {
        export type Params = {
            email: string
            password: string
        }

        export type Response = User
    }

    export namespace Update {
        export type Params = {
            uid: string
            attrs: object
        }

        export type Response = boolean
    }

    export namespace Get {
        export type Params = {
            uid: string
        }

        export type Response = User
    }

    export namespace GetList {
        export type Response = User[]
    }

    export namespace GetQuery {
        export type Params = {
            query?: GetQuery
        }

        export type Response = User[]
    }

    export namespace Delete {
        export type Params = {
            uid: string
        }

        export type Response = boolean
    }
}
