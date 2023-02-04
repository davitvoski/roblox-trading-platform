// TODO: tests logout

import test, { describe } from "node:test";
import { prismaMock } from "../prisma/singleton";
import request from 'supertest'
import app from "../app";
import { Prisma, User } from "@prisma/client";

describe("Authentication", () => {
    it("Should return 200 - /api/login", async () => {
        await prismaMock.$connect()
        await prismaMock.user.create({
            data:{
                userName: "test-user",
                password: "mypasswpord",
                email: "josh@gmail.com"
            }
        })
        const response = await request(app).post("/api/login")
            .send({
                username: "test-user",
                password: "mypasswpord"
            })

        console.log(response.body)
        expect(response.status).toBe(200)
    })

    it("Should return 401 - user not found - password missing - /api/login", async () => {
        await prismaMock.$connect()
        const response = await request(app).post("/api/login")
            .send({
                username: "tessssssst",
            })

        expect(response.status).toBe(401)
    })

    it("Should return 401 - user not found - username missing - /api/login", async () => {
        await prismaMock.$connect()
        const response = await request(app).post("/api/login")
            .send({
                password: "test"
            })
        console.log(response.body)

        expect(response.status).toBe(401)
    })

    it("Should return 200 - signup user - /api/signup", async () => {
        await prismaMock.$connect()
        const response = await request(app).post("/api/signup")
            .send({
                username: "tessssssst",
                password: "tessssssst",
                email: "Joshuah@gmail.com",

            })

        expect(response.status).toBe(200)
    })
})