import { Router, Request, Response, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import { AvatarsSchema, AvatarsReq } from '../models'
import getEntityValidationMiddleware from '../middleware/entityValidationMiddleware.ts'

const avatarRouter: Router = Router()

avatarRouter.post("/add", [getEntityValidationMiddleware(AvatarsSchema)], async (req: Request, res: Response, next: NextFunction)=> {
  //TODO: check for constraints
  prisma.avatars.create({
    data: req.body
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})

avatarRouter.get("/:userId", (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.userId) {
    res.status(400).end("Bad request")
    return
  }
  prisma.avatars.findUnique({
    where: {
      user_id: parseInt(req.params.userId)
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

avatarRouter.patch("/update/:userId", [getEntityValidationMiddleware(AvatarsReq)],(req: Request, res: Response, next: NextFunction) => {
  if(!req.params.userId){
    res.status(400).end("Bad request")
    return
  }
  prisma.avatars.update({
    where:
    {
      user_id: parseInt(req.params.userId)
    },
    data: req.body
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})


avatarRouter.delete("/delete/:userId", (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).end("Bad request")
    return
  }
  prisma.avatars.delete({
    where:
    {
      user_id: parseInt(req.params.userId)
    }
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})


export { avatarRouter }
