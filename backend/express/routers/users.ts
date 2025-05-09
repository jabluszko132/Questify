import { Router, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import { UsersReq } from '../models/users.ts';
import implementsClass from "../utils/keyCheck";

const usersRouter: Router = Router()

usersRouter.post("/add", async (req, res, next) => {
    if (Object.keys(req.body) != Object.keys(UsersReq.prototype)) {
        res.status(400).end("Bad request")
    }
    prisma.users.create({
        data:
            {
                ...req.body
            }
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})

usersRouter.get("/:userId", async (req, res, next) => {
    if (!req.params.userId) {
        res.status(400).end("Bad request")
    }
    prisma.users.findUnique({
        where: {
            id: parseInt(req.params.userId)
        }
    })
        .then((result: any) => {
            if (result)
                res.status(200).send(result)
            else
                res.status(404).end(JSON.stringify({ "404": "Not found" }));
        })
        .catch((err: any) => {
            next(err)
        })
})

usersRouter.patch("/update", async (req, res, next) => {
    if (Object.keys(req.body) !== Object.keys(UsersReq.prototype)) {
        res.status(400).end("Bad request")
    }
    prisma.users.update({
        where:
            {
                id: req.body.id
            },
        data: {
            ...req.body
        }
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})


usersRouter.delete("/delete/:userId", async (req, res, next) => {
    if (!req.params.userId) {
        res.status(400).end("Bad request")
    }
    prisma.users.delete({
        where:
            {
                id: req.body.userId
            }
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})


export { usersRouter }
