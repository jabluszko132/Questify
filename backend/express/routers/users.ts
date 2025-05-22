import { Router, Request, Response, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import {UsersReq, UsersSchema} from '../models';
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";

const usersRouter: Router = Router()

usersRouter.post("/add", [getEntityValidationMiddleware(UsersReq)], (req: Request, res: Response, next: NextFunction) => {
    prisma.users.create({
        data: req.body
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})

usersRouter.get("/:userId", (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.userId) {
        res.status(400).end("Bad request")
        return
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

usersRouter.patch("/update/:id", [getEntityValidationMiddleware(UsersReq)], (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        res.status(400).end("Bad request")
        return
    }
    prisma.users.update({
        where:
            {
                id: parseInt(req.params.id)
            },
        data: req.body
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})


usersRouter.delete("/delete/:userId", (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.userId) {
        res.status(400).end("Bad request")
        return
    }
    prisma.users.delete({
        where:
            {
                id: parseInt(req.params.userId)
            }
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})


export { usersRouter }
