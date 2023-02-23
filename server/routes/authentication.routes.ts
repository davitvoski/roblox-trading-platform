import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import session from "express-session";
import { generateHash } from "../utils/generateHash";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { googleLoginController, googleSignUpController, loginController, logoutController, singUpController } from "../controllers/auth.controller";
// TODO: Add google authentication
const router = express.Router()
const saltRounds = 10


router.post("/auth/google/signup", googleSignUpController)

router.post("/auth/google/login", googleLoginController)

// TODO: Implement Sessions
router.post("/logout", logoutController)

/**
 * @openapi
 * /api/signup:
 *  post:
 *   summary: Signs up the user.
 *   parameters:
 *     - in: body
 *       username: user
 *       description: The username of the user.
 *       schema:
 *         type: object
 *         required:
 *           - username
 *           - password
 *           - email
 *         properties:
 *           username:
 *             type: string
 *           password:
 *            type: string
 *           email:
 *            type: string
 *   description: Signs up the user by creating a new user in the database and hashing the user password.
 *   responses:
 *     200:
 *      description: A successful response. User Created
 *     500:
 *      description: A server error. Username already exists or internal error.
 *      content:
 *        application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     available:
 *                       type: boolean
 *                       description: Availability of the username.
 *                       example: true
 *                     error:
 *                       type: string
 *                       description: The error the server sends.
 *                       example: Username Taken - Please Choose Another Name.
 */
router.post("/signup", singUpController)

/**
 * @openapi
 * /api/login:
 *  post:
 *   summary: Login the user.
 *   parameters:
 *     - in: body
 *       username: user
 *       description: The username of the user.
 *       schema:
 *         type: object
 *         required:
 *           - username
 *           - password
 *         properties:
 *           username:
 *             type: string
 *           password:
 *            type: string
 *   description: Login the user by checking if the user exists and if the password is correct.
 *   responses:
 *     200:
 *      description: A successful response. User has Logged in.
 *      content:
 *        application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: UserWithoutPassword
 *                       description: The user information.
 *                       example: { username: "josh", email: "josh@gmail.com"}
 *     401:
 *      description: An unotahrized response. User trying to access another user's information or failed to login.
 *      content:
 *        application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     error_message:
 *                       type: string
 *                       description: The error the server sends.
 *                       example: User not found or password is incorrect.
 */
router.post('/login', loginController)


export { router as authenticationRouter }
