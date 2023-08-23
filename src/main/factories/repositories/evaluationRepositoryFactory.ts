import { EvaluationRepository } from '../../../infra/repositories'
import { FirebaseHelperFactory } from './firebaseHelperFactory'

export class EvaluationRepositoryFactory {
  private static instance: EvaluationRepositoryFactory

  public static getInstance(): EvaluationRepositoryFactory {
    if (!this.instance) {
      this.instance = new EvaluationRepositoryFactory()
    }

    return this.instance
  }

  public make(): EvaluationRepository {
    return new EvaluationRepository(
      FirebaseHelperFactory.getInstance().make().db,
    )
  }
}
