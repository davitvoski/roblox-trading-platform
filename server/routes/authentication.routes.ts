import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import session from "express-session";

const router = express.Router()
const prisma = new PrismaClient()
const saltRounds = 10

type TypeUserSession = session.Session & Partial<session.SessionData> & {
    userid?: string
}

let USER_SESSION: TypeUserSession | null = null

router.post("/logout", (req: express.Request, res: express.Response) => {
    console.log("logout")
    res.redirect('/login')
})

router.post('/login', async (req: express.Request, res: express.Response) => {
    if (USER_SESSION?.userid) {
        // TODO: Redirect to already logged in page
        res.redirect('/alreadyLoggedIn')
        return
    }

    try {
        console.log('req', req.body)
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = await bcrypt.hash(req.body.password, salt)

        const user = (await prisma.user.findMany({
            where: {
                userName: req.body.username,
                password: req.body.password
            }
        }))[0]

        if (user.password != hash)
            res.sendStatus(401)

        type UserWithoutPassword = Omit<typeof user, "password">
        USER_SESSION = req.session

        USER_SESSION.userid = user.userName

        res.status(200)
        res.send({ user: user as UserWithoutPassword })


    } catch (error) {
        console.log(error)
        res.sendStatus(401)
    }
})


export { router as authenticationRouter }
