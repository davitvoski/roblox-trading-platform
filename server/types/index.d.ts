import { User } from '@prisma/client'
import { PubUser } from "../../shared"

declare module 'express-session' {
    interface SessionData {
        user: PubUser
    }
}

export type RobloxResponseGetUserByUsername = {
    data: [
        {
            id: number
            name: string
            displayName: string
            rqeuestedUsername: string
        }
    ]
}



