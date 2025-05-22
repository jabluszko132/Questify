import { Router, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import { AvatarsSchema } from '../models/avatars'
import implementsClass from "../utils/keyCheck";

const avatarRouter: Router = Router()

avatarRouter.post("/add", async (req, res, next) => {
  const data = AvatarsSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).end("Bad request")
    return
  }
  prisma.avatars.create({
    data: data.data
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})

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

avatarRouter.patch("/update", async (req, res, next) => {
  const data = AvatarsSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).end("Bad request")
    return
  }
  prisma.avatars.update({
    where:
    {
      user_id: req.body.user_id
    },
    data: data.data
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})


avatarRouter.delete("/delete/:userId", async (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).end("Bad request")
  }
  prisma.avatars.delete({
    where:
    {
      user_id: req.body.user_id
    }
  }).catch((err: any) => {
    next(err)
  }).then((result: any) => {
    res.status(200).send(result)
  })
})


export { avatarRouter }
