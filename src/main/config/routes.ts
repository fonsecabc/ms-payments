import { Routes } from '../../presentation/helpers'
import * as controllers from '../../presentation/controllers'

export const routes: Routes[] = [
    {
        path: '/create',
        method: 'POST',
        handler: controllers.createUserController,
    },
    {
        path: '/update',
        method: 'PUT',
        handler: controllers.updateUserController,
    },
    {
        path: '/get',
        method: 'GET',
        handler: controllers.getUserController,
    },
    {
        path: '/delete',
        method: 'DELETE',
        handler: controllers.deleteUserController,
    },
]

