import { User } from '../../domain/entities'
import { QueryOperators } from '../../domain/enums'
import { UserRepositoryContract } from '../../application/contracts'

import { firestore, auth } from 'firebase-admin'

export class UserRepository implements UserRepositoryContract {
    constructor(
        private readonly db: firestore.Firestore,
        private readonly auth: auth.Auth,
    ) {}

    async create(params: UserRepositoryContract.Create.Params): Promise<UserRepositoryContract.Create.Response> {
        const { email, password } = params
        const uid = (await this.auth.createUser({ email, password })).uid
        const user: User = { uid, email, isActive: false, isEnabled: false, createdAt: new Date() }

        return this.db.collection('users').doc(uid).create(user).then(() => user)
    }

    async update(params: UserRepositoryContract.Update.Params): Promise<UserRepositoryContract.Update.Response> {
        const { uid, attrs } = params

        const user = await this.get({ uid })
        if (!user) return false

        return !!await this.db.collection('users').doc(uid).update(attrs)
    }

    async get(params: UserRepositoryContract.Get.Params): Promise<UserRepositoryContract.Get.Response> {
        const { uid } = params
        const user: User = (await this.db.collection('users').doc(uid).get()).data() as User

        return user
    }

    async getList(): Promise<UserRepositoryContract.GetList.Response> {
        const userList: User[] = (await this.db.collection('users').get()).docs.map((doc) => doc.data()) as User[]

        return userList
    }

    async getQuery(params: UserRepositoryContract.GetQuery.Params): Promise<UserRepositoryContract.GetQuery.Response> {
        const { query = { param: '', operator: QueryOperators.EQUAL, comparison: '' } } = params
        const userList: User[] = (await this.db.collection('users').where(query.param, query.operator, query.comparison).get()).docs.map((doc) => doc.data()) as User[]

        return userList
    }

    async delete(params: UserRepositoryContract.Delete.Params): Promise<UserRepositoryContract.Delete.Response> {
        const { uid } = params
        const user = await this.get({ uid })
        if (!user) return false

        user.deletedAt = new Date()

        return Promise.all([
            this.db.collection('deleted_users').doc(uid).create(user),
            this.db.collection('users').doc(uid).delete(),
            this.auth.deleteUser(uid),
        ]).then(() => true)
    }
}
