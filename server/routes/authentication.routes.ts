import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import session from "express-session";
import { generateHash } from "../utils/generateHash";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

// TODO: Add google authentication
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

router.post("/signup", async (req: express.Request, res: express.Response) => {
    try {

        const [salt, hashedPassword] = generateHash(req.body.password)

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                userName: req.body.username,
                password: hashedPassword
            }
        })
        console.log(user)

        res.status(201).send({ user: user })
    } catch (err) {
        console.log(err)
        res.status(500)
        // Check if user already exists
        if (err instanceof PrismaClientKnownRequestError) {
            res.json({ available: false, error: "Username Taken - Please Choose Another Name." })
        } else {
            res.send()
        }
    }

})


router.post('/login', async (req: express.Request, res: express.Response) => {
    if (USER_SESSION?.userid) {
        // TODO: Redirect to already logged in page
        res.redirect('/alreadyLoggedIn')
        return
    }

    try {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const user = (await prisma.user.findMany({
            where: {
                userName: req.body.username,
                password: req.body.password
            }
        }))[0]

        if (!user)
            throw Error("User not found")

        if (user.password != hash)
            throw Error("Password incorrect")

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