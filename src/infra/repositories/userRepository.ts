import { SubscriptionStatus } from '../../domain/enums'
import { UserRepositoryContract } from '../../application/contracts'

import { firestore } from 'firebase-admin'

export class UserRepository implements UserRepositoryContract {
  constructor(
    private readonly db: firestore.Firestore
  ) {}

  async attachSubscriptionToUser(params: UserRepositoryContract.AttachSubscriptionToUser.Params):
  Promise<UserRepositoryContract.AttachSubscriptionToUser.Response> {
    const { userUid, subscriptionUid } = params

    return !!await this.db.collection('users').doc(userUid).update({ subscriptionUid, subscriptionStatus: SubscriptionStatus.ACTIVE })
  }

  async updateSubscriptionStatus(params: UserRepositoryContract.UpdateSubscriptionStatus.Params):
  Promise<UserRepositoryContract.UpdateSubscriptionStatus.Response> {
    const { userUid, subscriptionStatus } = params

    return !!await this.db.collection('users').doc(userUid).update({ subscriptionStatus })
  }
}
