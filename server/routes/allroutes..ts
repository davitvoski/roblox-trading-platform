import express from "express";
import { authenticationRouter } from "./authentication.routes";

const allroutes = express.Router()

allroutes.use("/auth", authenticationRouter)

export default allroutes
