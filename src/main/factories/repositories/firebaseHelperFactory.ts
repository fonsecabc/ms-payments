import { variables } from '../../config'
import { FirebaseRepository } from '../../../infra/repositories'

export class FirebaseHelperFactory {
    private static instance: FirebaseHelperFactory

    public static getInstance(): FirebaseHelperFactory {
        if (!this.instance) {
            this.instance = new FirebaseHelperFactory()
        }

        return this.instance
    }

    public make(): FirebaseRepository {
        return new FirebaseRepository(
            JSON.parse(variables.firebaseAdminSdk)
        )
    }
}
