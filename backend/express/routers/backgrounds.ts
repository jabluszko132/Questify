import {Router} from 'express'
import prisma from '../dbCon.ts'
import {AttributeReq} from "../models";
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";
import {
    getCreateMiddleware,
    getReadByIdParamMiddleware,
    getUpdateByParamIdMiddleware
} from "../middleware/universalCrud";

const backgroundsRouter: Router = Router()

backgroundsRouter.post("/add", [getEntityValidationMiddleware(AttributeReq), getCreateMiddleware(prisma.backgrounds)])
backgroundsRouter.get("/:id", [getReadByIdParamMiddleware("id", prisma.backgrounds)])
backgroundsRouter.patch("/update/:id", [getEntityValidationMiddleware(AttributeReq), getUpdateByParamIdMiddleware("id", prisma.backgrounds)])
backgroundsRouter.delete("/delete/:id")

export { backgroundsRouter }