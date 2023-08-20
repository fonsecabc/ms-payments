import { UserRepositoryContract } from '../contracts'
import { CreateUserUsecase } from '../../domain/usecases'

export class CreateUserService implements CreateUserUsecase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
    ) { }

    async perform({ email, password }: CreateUserUsecase.Params): Promise<CreateUserUsecase.Response> {
        return await this.userRepository.create({ email, password })
    }
}
