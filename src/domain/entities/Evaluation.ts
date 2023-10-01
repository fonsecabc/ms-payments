import { NutritionalRoutineStatus } from '@/domain/enums'

export type Evaluation = {
    uid: string
    userUid: string
    client: any
    bioimpedance: string
    measurements: string
    nutricionistForm: string
    nutritionalRoutineStatus: NutritionalRoutineStatus
    nutritionalRoutineLink?: string
    createdAt: any
    deletedAt?: any
}
