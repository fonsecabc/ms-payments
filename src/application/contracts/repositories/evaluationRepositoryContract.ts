export interface EvaluationRepositoryContract {
  attachNutritionalRoutineOrderToEvaluation(params: EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Params):
   Promise<EvaluationRepositoryContract.AttachNutritionalRoutineOrderToEvaluation.Response>
}

export namespace EvaluationRepositoryContract {
  export namespace AttachNutritionalRoutineOrderToEvaluation {
    export type Params = {
      evaluationUid: string
      orderUid: string
    }

    export type Response = boolean
  }
}
