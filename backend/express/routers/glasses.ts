import {Router, Request, Response, NextFunction} from 'express'
import prisma from '../dbCon.ts'
import {AttributeReq} from "../models";
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";
import {
    getCreateMiddleware, getDeleteByIdParamMiddleware,
    getReadByIdParamMiddleware,
    getUpdateByParamIdMiddleware
} from "../middleware/universalCrud";

const glassesRouter: Router = Router()
glassesRouter.post("/add", [getEntityValidationMiddleware(AttributeReq), getCreateMiddleware(prisma.glasses)])
glassesRouter.get("/:id", [getReadByIdParamMiddleware("id", prisma.glasses)])
glassesRouter.patch("/update/:id", [getEntityValidationMiddleware(AttributeReq), getUpdateByParamIdMiddleware("id", prisma.glasses)])
glassesRouter.delete("/delete/:id", [getDeleteByIdParamMiddleware("id", prisma.glasses)])

export { glassesRouter }