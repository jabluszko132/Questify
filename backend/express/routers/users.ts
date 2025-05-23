import { Router } from 'express'
import prisma from '../dbCon.ts'
import {UsersReq} from '../models';
import getEntityValidationMiddleware from "../middleware/entityValidationMiddleware";
import {
    getCreateMiddleware, getDeleteByIdParamMiddleware,
    getReadByIdParamMiddleware,
    getUpdateByParamIdMiddleware
} from "../middleware/universalCrud";

const usersRouter: Router = Router()

usersRouter.post("/add", [getEntityValidationMiddleware(UsersReq), getCreateMiddleware(prisma.users)])
usersRouter.get("/:userId", [getReadByIdParamMiddleware("userId", prisma.users)])
usersRouter.patch("/update/:id", [getEntityValidationMiddleware(UsersReq), getUpdateByParamIdMiddleware("id", prisma.users)])
usersRouter.delete("/delete/:userId", [getDeleteByIdParamMiddleware("userId", prisma.users)])


export { usersRouter }
