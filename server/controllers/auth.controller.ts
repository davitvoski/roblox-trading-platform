import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import session from "express-session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { generateHash } from "../utils/generateHash";

const prisma = new PrismaClient()

// type TypeUserSession = session.Session & Partial<session.SessionData> & {
//     userid?: string
// }

// let USER_SESSION: TypeUserSession | null = null

/**
 * This function is used to logout the user.
 * 
 * @param {Request} req express request object
 * @param {Response} res  express response object
 */
export function logoutController(req: Request, res: Response) {
    console.log("logout")
    res.redirect('/login')
}

/**
 * This function is used to signup the user.
 * 
 * @param {Request} req express request object
 * @param {Response} res express response object
 */
export async function singUpController(req: Request, res: Response) {
    try {
        const [salt, hashedPassword] = generateHash(req.body.password)

        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                userName: req.body.username,
                password: hashedPassword
            }
        })

        res.status(201).send({ user: user })
    } catch (err) {
        res.status(500)
        // Check if user already exists
        if (err instanceof PrismaClientKnownRequestError) {
            res.json({ available: false, error: "Username Taken - Please Choose Another Name." })
        } else {
            res.send()
        }
    }

}

/**
 * This function is used to login the user and checks if the user is the owner of the account.
 * 
 * @param {Request} req express request object 
 * @param {Response} res express response object
 */
export async function loginController(req: Request, res: Response) {
    // if (USER_SESSION?.userid) {
    //     // TODO: Redirect to already logged in page
    //     res.redirect('/alreadyLoggedIn')
    //     return
    // }
    try {
        const user = (await prisma.user.findMany({
            where: {
                userName: req.body.username
            }
        }))[0]

        if (!user) throw Error("User not found")

        const isSameUser = bcrypt.compareSync(req.body.password, user.password)

        if (!isSameUser) throw Error("Incorrect Password")

        type UserWithoutPassword = Omit<typeof user, "password">
        // USER_SESSION = req.session

        // USER_SESSION.userid = user.userName

        res.status(200)
        res.json({ user: user as UserWithoutPassword })
    } catch (error) {
        res.status(401)
        if (error instanceof Error) {
            if (error.message == "User not found") res.json({ error_message: "User not found" })
            if (error.message == "Incorrect Password") res.json({ error_message: "Incorrect Password" })
        }
        res.send()
    }
}