import { PrismaClient, User } from "@prisma/client";

export async function getUniqueUserByUsername(prisma: PrismaClient, userName: string): Promise<User> {
    const myUser = await prisma.user.findUnique({
        where: {
            userName: userName
        }
    })

    if (!myUser) throw Error("User not found")

    return myUser

}

export async function getUniqueUserByEmail(prisma: PrismaClient, email: string): Promise<User> {
    const myUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!myUser) throw Error("User not found")

    return myUser

}