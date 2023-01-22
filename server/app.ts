import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import { auth, ConfigParams } from 'express-openid-connect'
import passport from "passport"
import { addGooglePassportStrategy } from './auth/passport_google_oidc'
import session from 'express-session'
import { authenticationRouter } from './routes/authentication.routes'


dotenv.config()


const app = express()
// Expreess middleware
let secret: {
    secret: string,
    resave: boolean,
    saveUninitialized: boolean
} = { secret: process.env['SECRET'] as string, resave: false, saveUninitialized: true }

addGooglePassportStrategy()

app.use(session(
    secret
))

app.use(passport.initialize())
app.use(passport.session())

app.use(compression())
app.use(express.json())
app.use(express.static("../client/build"))

// Authentication route
app.use("/login", authenticationRouter)


// Default 404
app.use((_: express.Request, res: express.Response) => {
    res.sendStatus(404)

})

export default app