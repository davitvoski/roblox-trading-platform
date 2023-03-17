import express, { Request, Response } from "express";
import { getRobloxUserByUsername } from "../controllers/roblox.controller";
import { isAuthenticated } from "./authentication.routes";

const robloxrouter = express.Router();

robloxrouter.get("/users/:username", isAuthenticated, getRobloxUserByUsername)

export default robloxrouter
