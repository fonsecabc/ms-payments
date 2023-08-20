import { UserRepositoryContract } from '../contracts'
import { UpdateUserUsecase } from '../../domain/usecases'

export class UpdateUserService implements UpdateUserUsecase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
    ) { }

    async perform({ uid, attrs }: UpdateUserUsecase.Params): Promise<UpdateUserUsecase.Response> {
        return await this.userRepository.update({ uid, attrs })
    }
}
