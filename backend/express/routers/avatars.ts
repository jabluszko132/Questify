import { Router } from 'express'
import prisma from '../dbCon.ts'
import { AvatarsSchema, AvatarsReq } from '../models'
import getEntityValidationMiddleware from '../middleware/entityValidationMiddleware.ts'
import { getCreateMiddleware, getReadByIdParamMiddleware, getUpdateByParamIdMiddleware, getDeleteByIdParamMiddleware } from "../middleware/universalCrud";

const avatarRouter: Router = Router()

avatarRouter.post("/add", [getEntityValidationMiddleware(AvatarsSchema), getCreateMiddleware(prisma.avatars)])
avatarRouter.get("/:user_id",[getReadByIdParamMiddleware('user_id',prisma.avatars)])
avatarRouter.patch("/update/:user_id", [getEntityValidationMiddleware(AvatarsReq), getUpdateByParamIdMiddleware('user_id',prisma.avatars)])
avatarRouter.delete("/delete/:user_id", [getDeleteByIdParamMiddleware('user_id',prisma.avatars)])

export { avatarRouter }
