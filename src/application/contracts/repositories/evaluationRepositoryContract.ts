import { Evaluation } from '../../../domain/entities'

export interface EvaluationRepositoryContract {
  attachNutritionalRoutineOrderToEvaluation(params: EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Params):
  Promise<EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Response>
  updateEvaluationPaymentStatusByOrderUid(params: EvaluationRepositoryContract.UpdateEvaluationPaymentStatusByOrderUid.Params):
  Promise<EvaluationRepositoryContract.UpdateEvaluationPaymentStatusByOrderUid.Response>
  getByUid(params: EvaluationRepositoryContract.GetByUid.Params): Promise<EvaluationRepositoryContract.GetByUid.Response>
}

export namespace EvaluationRepositoryContract {
  export namespace AttachNutritionalRoutineOrderToEvaluation {
    export type Params = {
      evaluationUid: string
      orderUid: string
      paymentStatus: string
    }

    export type Response = boolean
  }

  export namespace GetByUid {
    export type Params = {
      uid: string
    }

    export type Response = Evaluation | undefined
  }

  export namespace UpdateEvaluationPaymentStatusByOrderUid {
    export type Params = {
      orderUid: string
      paymentStatus: string
    }

    export type Response = boolean
  }
}
