import { NutritionalRoutineStatus } from '@/domain/enums'
import { EvaluationRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'
import { Evaluation } from '@/domain/entities'

export class EvaluationRepository implements EvaluationRepositoryContract {
  private readonly evaluationsRef: firestore.CollectionReference

  constructor(
    private readonly db: firestore.Firestore
  ) {
    this.evaluationsRef = this.db.collection('evaluations')
  }

  async attachNutritionalRoutineOrderToEvaluation(params: EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Params):
  Promise<EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Response> {
    const { evaluationUid, orderUid, paymentStatus } = params

    return await this.evaluationsRef.doc(evaluationUid)
      .update({ orderUid, nutritionalRoutineStatus: NutritionalRoutineStatus.REQUESTED, nutritionalRoutinePaymentStatus: paymentStatus })
      .then(() => true)
      .catch(() => false)
  }

  async updateEvaluationPaymentStatusByOrderUid(params: EvaluationRepositoryContract.UpdateEvaluationPaymentStatusByOrderUid.Params):
    Promise<EvaluationRepositoryContract.UpdateEvaluationPaymentStatusByOrderUid.Response> {
    const { orderUid, paymentStatus } = params

    const evaluation = (await this.evaluationsRef.where('orderUid', '==', orderUid).get()).docs[0].data() as Evaluation

    return await this.evaluationsRef.doc(evaluation.uid)
      .update({ nutritionalRoutinePaymentStatus: paymentStatus })
      .then(() => true)
      .catch(() => false)
  }

  async getByUid(params: EvaluationRepositoryContract.GetByUid.Params): Promise<EvaluationRepositoryContract.GetByUid.Response> {
    const { uid } = params
    const evaluation = (await this.evaluationsRef.doc(uid).get()).data() as Evaluation

    return {
      ...evaluation,
      createdAt: evaluation?.createdAt.toDate(),
    }
  }
}
