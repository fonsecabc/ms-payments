import { UserRepository } from '../../../infra/repositories'
import { FirebaseHelperFactory } from './firebaseHelperFactory'

export class UserRepositoryFactory {
  private static instance: UserRepositoryFactory

  public static getInstance(): UserRepositoryFactory {
    if (!this.instance) {
      this.instance = new UserRepositoryFactory()
    }

    return this.instance
  }

  public make(): UserRepository {
    return new UserRepository(
      FirebaseHelperFactory.getInstance().make().db,
    )
  }
}
