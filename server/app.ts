import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import { auth, ConfigParams } from 'express-openid-connect'
import passport from "passport"
import { addGooglePassportStrategy } from './auth/passport_google_oidc'
import session from 'express-session'


dotenv.config()


const app = express()
// Expreess middleware
let secret: {
    secret: string,
    resave: boolean,
    saveUninitialized: boolean
} = { secret: process.env['SECRET'] as string, resave: false, saveUninitialized: true }
app.use(session(
    secret
))

app.use(compression())
app.use(express.json())
app.use(express.static("../client/build"))

addGooglePassportStrategy()

app.get('/login/google', passport.authenticate('google'))

app.get('/oauth2/redirect',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
    }
)

app.get('/login', (_: express.Request, res: express.Response) => {
    res.send('login')

})
// Default 404
app.use((_: express.Request, res: express.Response) => {
    res.sendStatus(404)

})

export default app