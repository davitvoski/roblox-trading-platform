import express, { Request, Response } from "express";
import { googleLoginController, googleSignUpController, loginController, logoutController, singUpController } from "../controllers/auth.controller";

export function isAuthenticated(req: Request, res: Response, next: express.NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error_message: "You are not logged in" });
  }
}

const router = express.Router()

router.post("/logout", isAuthenticated, logoutController)

router.post("/google/signup", googleSignUpController)

// Generate swagger documentation for this route
router.post("/google/login", googleLoginController)

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
