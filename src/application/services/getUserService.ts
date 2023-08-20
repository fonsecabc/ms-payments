import { GetType } from '../../domain/enums'
import { NotFoundError } from '../../domain/errors'
import { UserRepositoryContract } from '../contracts'
import { GetUserUsecase } from '../../domain/usecases'
import { InvalidParamError } from '../../presentation/errors'

export class GetUserService implements GetUserUsecase {
    constructor(
        private readonly userRepository: UserRepositoryContract,
    ) { }

    async perform({ uid = '', type, query }: GetUserUsecase.Params): Promise<GetUserUsecase.Response> {
        let response: GetUserUsecase.Response

        switch (type) {
        case GetType.ENTITY:
            if (!uid) return new InvalidParamError('user uid')

            response = await this.userRepository.get({ uid })
            if (!response) return new NotFoundError('user')

            break
        case GetType.LIST:
            response = await this.userRepository.getList()
            break
        case GetType.QUERY:
            if (!query) return new InvalidParamError('get query')

            response = await this.userRepository.getQuery({ query })
            break
        default:
            response = new InvalidParamError('get type')
            break
        }

        return response
    }
}
