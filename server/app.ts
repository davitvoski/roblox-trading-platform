import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import { auth, ConfigParams } from 'express-openid-connect'
dotenv.config()

const app = express()

// AUTH0 CONFIGURATION
const authConfig: ConfigParams = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env['SECRET'] as string,
    baseURL: 'http://localhost:3000', // TODO: Change this to the URL of your app in .env
    clientID: process.env['CLIENT_ID'] as string,
    issuerBaseURL: process.env["ISSUER_BASE_URL"] as string
}
app.use(auth(authConfig))

// Expreess middleware
app.use(compression())
app.use(express.json())
app.use(express.static("../client/build"))

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!')
})

app.get('/login', (req: express.Request, res: express.Response) => {
    res.send('LOGIN PAGE')
})


// Default 404
app.use((_: express.Request, res: express.Response) => {
    res.sendStatus(404)

})

export default app