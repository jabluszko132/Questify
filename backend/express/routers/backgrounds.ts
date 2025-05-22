import {Router, Request, Response, NextFunction} from 'express'
import prisma from '../dbCon.ts'
import {AttributeReq} from "../models";
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";

const backgroundsRouter: Router = Router()
backgroundsRouter.post("/add", [getEntityValidationMiddleware(AttributeReq)], (req: Request, res: Response, next: NextFunction) => {
    prisma.backgrounds.create({
        data: req.body
    }).catch((err: any) => {
        next(err)
    })
})

backgroundsRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id){
        res.status(400).end("Bad request")
        return
    }
    prisma.backgrounds.findUnique({
        where: {
            id: parseInt(req.params.id)
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

backgroundsRouter.patch("/update/:id", [getEntityValidationMiddleware(AttributeReq)], (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
        res.status(400).end("Bad request")
        return
    }
    prisma.backgrounds.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    }).catch((err: any) => {
        next(err)
    }).then((result: any) => {
        res.status(200).send(result)
    })
})

backgroundsRouter.delete("/delete/:id", (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
        res.status(400).end("Bad request")
        return
    }
    prisma.backgrounds.delete({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((result: any) => {
        res.status(200).send(result)
    }).catch((err: any) => {
        next(err)
    })
})

export { backgroundsRouter }