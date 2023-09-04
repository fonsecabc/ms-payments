import { Subscription } from "./Subscription"

export interface User {
    uid: string
    email: string
    createdAt: any
    deletedAt?: any
    customerUid?: string
    subscription?: Subscription
}
