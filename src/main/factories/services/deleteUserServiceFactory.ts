import { UserRepositoryFactory } from '../../factories'
import { DeleteUserService } from '../../../application/services'

export class DeleteUserServiceFactory {
    private static instance: DeleteUserServiceFactory

    public static getInstance(): DeleteUserServiceFactory {
        if (!this.instance) {
            this.instance = new DeleteUserServiceFactory()
        }

        return this.instance
    }

    public make(): DeleteUserService {
        return new DeleteUserService(
            UserRepositoryFactory.getInstance().make()
        )
    }
}
