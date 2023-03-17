import express from "express";
import { authenticationRouter } from "./authentication.routes";
import robloxrouter from "./roblox.routes";

const allroutes = express.Router()

allroutes.use("/auth", authenticationRouter)

allroutes.use("/roblox", robloxrouter)

export default allroutes
