import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {

    // BACKGROUNDS
    await prisma.backgrounds.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            price: 0
        },
    })
    await prisma.backgrounds.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            price: 0
        },
    })

    // FRAMES
    await prisma.frames.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            price: 40
        },
    })
    await prisma.frames.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            price: 40
        },
    })

    // GLASSES
    await prisma.glasses.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            price: 75
        },
    })
    await prisma.glasses.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            price: 25
        },
    })

    // HATS
    await prisma.hats.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            price: 50
        },
    })

    // USERS
    await prisma.users.upsert({
        where: { email: 'sigma@example.com' },
        update: {},
        create: {
            email: 'sigma@example.com',
            username: 'sigma',
            password: {
                create: {
                    hash: await bcrypt.hash("sigma", 10)
                },
            },
            avatar: {
                create: {
                    hat_id: null,
                    glasses_id: null,
                    background_id: 1,
                    frame_id: null
                }
            },
            stats: {
                create: {
                    coins: 0,
                    exp: 0,
                    questsCompleted: 0
                }
            }
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })