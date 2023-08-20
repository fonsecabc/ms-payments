import { User } from './User'
import { Client } from './Client'
import { Evaluation } from './Evaluation'
import { ClientListObject } from './ClientListObject'
import { EvaluationListObject } from './EvaluationListObject'

export type Entity = User | Client | Evaluation | ClientListObject[] | EvaluationListObject[] | User[]
