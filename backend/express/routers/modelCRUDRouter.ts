import {ZodObject} from "zod";

export interface CRUDRouterConfig {
    idName: string;
    createModel: ZodObject<any>;
    updateModel: ZodObject<any>;
}

/**
 * Generates a simple CRUD router for a given Prisma schema model.
 * @description Works for models with a single PK field, doesn't support composite keys.
 * Does not have a "findAll" endpoint, you need to implement that separately.
 * @param {any} prismaSchema - The Prisma schema for the model. E.g.: prisma.mySchema
 * @param {CRUDRouterConfig} config - Config for given router
 */
export default function getModelCRUDRouter( prismaSchema: any, config: CRUDRouterConfig) {
  const { Router } = require('express');

  const {getEntityValidationMiddleware} = require('../middleware/entityValidationMiddleware.ts');
  const { getCreateMiddleware, getReadByIdParamMiddleware, getUpdateByParamIdMiddleware, getDeleteByIdParamMiddleware } = require("../middleware/universalCrud");

  const modelRouter: typeof Router = Router();

  modelRouter.post("/", [getEntityValidationMiddleware(config.createModel), getCreateMiddleware(prismaSchema)]);
  modelRouter.get(`/:${config.idName}`, [getReadByIdParamMiddleware(config.idName, prismaSchema)]);
  modelRouter.patch(`/:${config.idName}`, [getEntityValidationMiddleware(config.updateModel), getUpdateByParamIdMiddleware('id', prismaSchema)]);
  modelRouter.delete(`/:${config.idName}`, [getDeleteByIdParamMiddleware(config.idName, prismaSchema)]);

  return modelRouter;
}