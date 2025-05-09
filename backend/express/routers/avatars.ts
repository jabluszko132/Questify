import { Router, NextFunction } from 'express'
import prisma from '../dbCon.ts'
import Avatars from '../models/avatars'
import implementsClass from "../utils/keyCheck";

const avatarRouter: Router = Router()

avatarRouter.post("/add", async (req, res, next) => {
  if (Object.keys(req.body) !== Object.keys(Avatars.prototype)) {
    res.status(400).end("Bad request")
  }
  prisma.avatars.create({
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
  if (Object.keys(req.body) !== Object.keys(Avatars.prototype)) {
    res.status(400).end("Bad request")
  }
  prisma.avatars.update({
    where:
    {
      user_id: req.body.user_id
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
