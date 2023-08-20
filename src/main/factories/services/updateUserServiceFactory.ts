import { UserRepositoryFactory } from '../../factories'
import { UpdateUserService } from '../../../application/services'

export class UpdateUserServiceFactory {
    private static instance: UpdateUserServiceFactory

    public static getInstance(): UpdateUserServiceFactory {
        if (!this.instance) {
            this.instance = new UpdateUserServiceFactory()
        }

        return this.instance
    }

    public make(): UpdateUserService {
        return new UpdateUserService(
            UserRepositoryFactory.getInstance().make()
        )
    }
}
