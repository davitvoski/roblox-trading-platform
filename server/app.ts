import dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from "swagger-ui-express"
import { authenticationRouter } from './routes/authentication.routes'
import { PrismaClient } from '@prisma/client'
import session from 'express-session'
dotenv.config()

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "This is the documentation for the Website Server",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server"
        },
        {
            url: "TBD",
            description: "Production server"
        }
    ]
}

const options: swaggerJSDoc.Options = {
    swaggerDefinition,
    apis: ['./routes/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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