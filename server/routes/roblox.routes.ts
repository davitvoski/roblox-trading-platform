import express, { Request, Response } from "express";
import { getRobloxUserByUsername, verifyRobloxUserDescription } from "../controllers/roblox.controller";
import { isAuthenticated } from "./authentication.routes";

const robloxrouter = express.Router();

/**
 * Retrieve a Roblox user by their username.
 *
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get a Roblox user by their username.
 *     description: Returns a user object for the given Roblox username.
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The Roblox username of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Returns the user object.
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
robloxrouter.get("/users/:username", isAuthenticated, getRobloxUserByUsername);

robloxrouter.post("/users/verify", isAuthenticated, verifyRobloxUserDescription)
export default robloxrouter
