import { UserRepositoryFactory } from '../../factories'
import { GetUserService } from '../../../application/services'

export class GetUserServiceFactory {
    private static instance: GetUserServiceFactory

    public static getInstance(): GetUserServiceFactory {
        if (!this.instance) {
            this.instance = new GetUserServiceFactory()
        }

        return this.instance
    }

    public make(): GetUserService {
        return new GetUserService(
            UserRepositoryFactory.getInstance().make()
        )
    }
}
