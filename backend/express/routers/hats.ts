import {Router} from 'express'
import prisma from '../dbCon.ts'
import {AttributeReq} from "../models";
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";
import {
    getReadByIdParamMiddleware,
    getUpdateByParamIdMiddleware,
    getCreateMiddleware,
    getDeleteByIdParamMiddleware,
} from "../middleware/universalCrud";

const hatsRouter: Router = Router()
hatsRouter.post("/add", [getEntityValidationMiddleware(AttributeReq),getCreateMiddleware(prisma.hats)])
hatsRouter.get("/:id", [getReadByIdParamMiddleware("id", prisma.hats)])
hatsRouter.patch("/update/:id", [getEntityValidationMiddleware(AttributeReq), getUpdateByParamIdMiddleware("id", prisma.hats)])
hatsRouter.delete("/delete/:id", [getDeleteByIdParamMiddleware("id", prisma.hats)])

export { hatsRouter }