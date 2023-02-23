import { User } from '@prisma/client'
import { PubUser} from "../../shared"

declare module 'express-session' {
    interface SessionData {
        user: PubUser
    }
}

