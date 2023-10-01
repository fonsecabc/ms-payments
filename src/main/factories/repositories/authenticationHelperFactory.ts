import { AuthRepository } from '@/infra/repositories'
import { FirebaseHelperFactory } from './firebaseHelperFactory'

export class AuthenticationRepositoryFactory {
  private static instance: AuthenticationRepositoryFactory

  public static getInstance(): AuthenticationRepositoryFactory {
    if (!this.instance) {
      this.instance = new AuthenticationRepositoryFactory()
    }

    return this.instance
  }

  public make(): AuthRepository {
    return new AuthRepository(
      FirebaseHelperFactory.getInstance().make().auth
    )
  }
}
