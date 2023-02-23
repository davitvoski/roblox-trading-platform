import { Request, Response } from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { generateHash } from "../utils/generateHash";
import prisma from "../prisma/client";
import { getUniqueUserByEmail, getUniqueUserByUsername } from "../prisma/calls/user";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { PubUser } from "../../shared";
dotenv.config();

const client = new OAuth2Client(process.env["GOOGLE_CLIENT_ID"]);

/**
 * This function is used to logout the user.
 *
 * @param {Request} req express request object
 * @param {Response} res  express response object
 */
export function logoutController(req: Request, res: Response) {
  req.session.destroy(function (err) {
    if (err || err === undefined) {
      return res.sendStatus(500)
    }
    res.clearCookie('id')
    return res.sendStatus(200)
  })


}

/**
 * This function is used to sign in the user using google.
 * @param req express request object
 * @param res express response object
 */
export async function googleSignUpController(req: Request, res: Response) {
  try {
    if (!req.body.token) {
      res.status(498).json({ error: "Invalid Token" });
    }
    const token = req.body.token;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env["GOOGLE_CLIENT_ID"] as string,
    });

    if (!ticket) {
      res
        .status(401)
        .json({ error: "You are not authorized to use this token." });
      return;
    }

    // Get User
    let r = (Math.random() + 1).toString(36).substring(7);

    const tokenPayload = ticket.getPayload();
    const userExists = await getUniqueUserByEmail(prisma, tokenPayload?.email as string)

    if (userExists) {
      res.status(401).json({ error_message: "User already exists" })
      return
    }

    const user = await prisma.user.create({
      data: {
        userName: tokenPayload?.name + r as string,
        email: tokenPayload?.email as string,
        password: ""
      }
    })

    res.json("User created")

  } catch (error) {
    console.log(error);
    res.status(500)
    res.json({
      error_message: "Something went wrong"
    })
  }
}

/**
 * This function is used to sign in the user using google.
 * @param req express request object
 * @param res express response object
 */
export async function googleLoginController(req: Request, res: Response) {
  try {
    if (!req.body.token) {
      res.status(498).json({ error: "Invalid Token" });
    }
    const token = req.body.token;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env["GOOGLE_CLIENT_ID"] as string,
    });

    if (!ticket) {
      res
        .status(401)
        .json({ error: "You are not authorized to use this token." });
      return;
    }

    const tokenPayload = ticket.getPayload();
    const user = await getUniqueUserByEmail(prisma, tokenPayload?.email as string)

    if (!user) throw Error("User not found")

    // Create session
    req.session.regenerate(err => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const pubuser: PubUser = {
        userName: user.userName,
        email: user.email
      }
      req.session.user = pubuser
      res.json({ user: pubuser })
    })

  } catch (error) {
    console.log(error);
    res.status(400)
    if (error instanceof Error) {
      if (error.message === "User not found") res.status(401).json({
        error_message: error.message
      })
    }
  }
}

/**
 * This function is used to signup the user.
 *
 * @param {Request} req express request object
 * @param {Response} res express response object
 */
export async function singUpController(req: Request, res: Response) {
  try {
    const [salt, hashedPassword] = generateHash(req.body.password);

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        userName: req.body.username,
        password: hashedPassword,
      },
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(500);
    // Check if user already exists
    if (err instanceof PrismaClientKnownRequestError) {
      res.json({
        available: false,
        error: "Username Taken - Please Choose Another Name.",
      });
    } else {
      res.send();
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
    const user = await getUniqueUserByUsername(prisma, req.body.username);

    if (!user) throw Error("User not found");

    const isSameUser = bcrypt.compareSync(req.body.password, user.password);

    if (!isSameUser) throw Error("Incorrect Password");

    // USER_SESSION = req.session

    // USER_SESSION.userid = user.userName

    // Create session
    req.session.regenerate(err => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const pubuser: PubUser = {
        userName: user.userName,
        email: user.email
      }
      req.session.user = pubuser
      res.json({ user: pubuser })
    })

  } catch (error) {
    res.status(401);
    if (error instanceof Error) {
      if (error.message == "User not found")
        res.json({ error_message: "User not found" });
      if (error.message == "Incorrect Password")
        res.json({ error_message: "Incorrect Password" });
    }
    res.send();
  }
}
