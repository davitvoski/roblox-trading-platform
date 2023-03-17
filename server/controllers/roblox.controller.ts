import { Request, Response } from "express";
import { getRobloxUserByID, getRobloxUserDescription, getUserByUsername } from "./non-routes/roblox.thirdapi";

/**
 * Controller to get the roblox user by username
 * @param req Express Request
 * @param res Express Response
 */
export async function getRobloxUserByUsername(req: Request, res: Response) {
    try {
        req.session.user!.robloxUsername = req.params['username'];

        const robloxID = await getUserByUsername(req.session.user!.robloxUsername);

        if (!robloxID) return res.status(404).send("User not found");

        req.session.user!.robloxId = robloxID as number;

        res.sendStatus(204)
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
}

/**
 * Controller to verify the roblox user description
 * @param req Express Request
 * @param res Express Response
 */
export async function verifyRobloxUserDescription(req: Request, res: Response) {
    try {
        const words = req.body.words as string[]

        const user = await getRobloxUserByID(req.session.user!.robloxId);
        if (!user.description.toLowerCase().includes(words.join("").toLowerCase())) return res.status(400).send("Description does not contain the words")

        req.session.user!.robloxUser = user
        res.json({ user: user })

    } catch (err) {
        res.status(500).send("Something went wrong")
    }
}