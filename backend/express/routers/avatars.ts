import { Router, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import Avatars from '../models/avatars'

const avatarRouter: Router = Router()

avatarRouter.get("/:userId", async (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).end("Bad request")
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
export { avatarRouter }
