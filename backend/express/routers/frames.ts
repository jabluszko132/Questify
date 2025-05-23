import {Router, Request, Response, NextFunction} from 'express'
import prisma from '../dbCon.ts'
import {AttributeReq} from "../models";
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";
import {
    getCreateMiddleware,
    getReadByIdParamMiddleware,
    getUpdateByParamIdMiddleware,
    getDeleteByIdParamMiddleware,
} from "../middleware/universalCrud";

const framesRouter: Router = Router()
framesRouter.post("/add", [getEntityValidationMiddleware(AttributeReq), getCreateMiddleware(prisma.frames)])
framesRouter.get("/:id", [getReadByIdParamMiddleware("id", prisma.frames)])
framesRouter.patch("/update/:id", [getEntityValidationMiddleware(AttributeReq), getUpdateByParamIdMiddleware("id", prisma.frames)])
framesRouter.delete("/delete/:id", [getDeleteByIdParamMiddleware("id", prisma.frames)])

export { framesRouter }