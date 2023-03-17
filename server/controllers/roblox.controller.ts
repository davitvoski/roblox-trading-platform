import { Request, Response } from "express";
import { getUserByUsername } from "./non-routes/roblox.thirdapi";

export async function getRobloxUserByUsername(req: Request, res: Response) {
    try {
        console.log("roblox username", req.params['username']);
        req.session.user!.robloxUsername = req.params['username'];

        const robloxID = await getUserByUsername(req.session.user!.robloxUsername);
        if (!robloxID) return res.status(404).send("User not found");

        console.log(robloxID)
        req.session.user!.robloxId = robloxID as number;

        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }


}