import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'

import { authenticationRouter } from './routes/authentication.routes'
import { PrismaClient } from '@prisma/client'
import session from 'express-session'


dotenv.config()

const prisma = new PrismaClient()
prisma.$connect()

const app = express()
    app.set('trust proxy', 1) // trust first proxy

const options: {
    secret: string,
    resave: boolean,
    saveUninitialized: boolean,
    cookie: { secure?: boolean }
} = {
    secret: process.env['SECRET'] as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}

if (app.get('env') === 'production') {
    options.cookie.secure = true // serve secure cookies
}

// Express middleware
app.use(session(options))

app.use(compression())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static("../client/build"))

// Authentication route
app.use("/api", authenticationRouter)


// Default 404
app.use((_: express.Request, res: express.Response) => {
    res.sendStatus(404)

})

export default app