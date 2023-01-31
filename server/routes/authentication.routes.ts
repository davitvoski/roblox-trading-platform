import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import session from "express-session";
import { generateHash } from "../utils/generateHash";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { loginController, logoutController, singUpController } from "../controllers/auth.controller";

// TODO: Add google authentication
const router = express.Router()
const prisma = new PrismaClient()
const saltRounds = 10

type TypeUserSession = session.Session & Partial<session.SessionData> & {
    userid?: string
}

let USER_SESSION: TypeUserSession | null = null

router.post("/logout", logoutController)

router.post("/signup", singUpController)

router.post('/login', loginController)


export { router as authenticationRouter }
