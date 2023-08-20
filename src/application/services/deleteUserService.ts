import { UserRepositoryContract } from '../contracts'
import { DeleteUserUsecase } from '../../domain/usecases'

export class DeleteUserService implements DeleteUserUsecase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
    ) { }

    async perform({ uid }: DeleteUserUsecase.Params): Promise<DeleteUserUsecase.Response> {
        return await this.userRepository.delete({ uid })
    }
}
