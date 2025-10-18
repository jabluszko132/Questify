import { Request, Response, NextFunction } from 'express'

/**
 * @param {string} idName - The name of the ID parameter used in the route (e.g., for "/:id" it's "id").
 * @param {any} prismaSchema - The Prisma schema for the model. E.g.: prisma.mySchema
 * @param {boolean} isString - Whether the ID parameter is a string. Defaults to false (number).
 * @returns Middleware to delete a record by ID from the database using the provided Prisma schema.
 */
export function getDeleteByIdParamMiddleware(idName: string, prismaSchema: any, isString?: boolean) {
    return (req: Request,res: Response,next: NextFunction) => {
        try {
            if(!(idName in req.params)) {
                res.status(400).end("Bad request")
                return
            }
            prismaSchema.delete({
                where: {
                    [idName]: isString ? idName : parseInt(req.params[idName])
                }
            }).then((result: any) => {
                res.status(200).json(result)
                return
            }).catch((err: any) => {
                next(err)
            })
        }catch(err){
            next(err)
        }
    }
}