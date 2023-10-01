import { User } from '@/domain/entities'
import { UserRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'

export class UserRepository implements UserRepositoryContract {
  constructor(
    private readonly db: firestore.Firestore
  ) {}

  async attachSubscriptionToUser(params: UserRepositoryContract.AttachSubscriptionToUser.Params):
  Promise<UserRepositoryContract.AttachSubscriptionToUser.Response> {
    const { userUid, subscription } = params

    return await this.db.collection('users').doc(userUid).update({ subscription }).then(() => true).catch(() => false)
  }

  async updateSubscriptionBySubscriptionUid(params: UserRepositoryContract.UpdateSubscriptionBySubscriptionUid.Params):
  Promise<UserRepositoryContract.UpdateSubscriptionBySubscriptionUid.Response> {
    const { subscription } = params

    const user = (
      await this.db.collection('users')
        .where('subscription.uid', '==', subscription.uid)
        .get()
    ).docs[0].data() as User

    return await this.db.collection('users').doc(user.uid).update({ subscription }).then(() => true).catch(() => false)
  }
}
