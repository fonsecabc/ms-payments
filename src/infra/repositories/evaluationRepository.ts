import { NutritionalRoutineStatus } from '../../domain/enums'
import { EvaluationRepositoryContract } from '../../application/contracts'

import { firestore } from 'firebase-admin'

export class EvaluationRepository implements EvaluationRepositoryContract {
  constructor(
    private readonly db: firestore.Firestore
  ) {}

  async attachNutritionalRoutineOrderToEvaluation(params: EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Params):
  Promise<EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Response> {
    const { evaluationUid, orderUid } = params

    return !!await this.db.collection('evaluations').doc(evaluationUid).update({ orderUid, nutritionalRoutineStatus: NutritionalRoutineStatus.REQUESTED })
  }
}
