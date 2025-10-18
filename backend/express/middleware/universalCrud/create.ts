import { Request, Response, NextFunction } from 'express'

/**
 * @param {any} prismaSchema - The Prisma schema for the model. E.g.: prisma.mySchema
 * @returns Middleware to create a new record in the database using the provided Prisma schema.
 */
export function getCreateMiddleware(prismaSchema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            prismaSchema.create({
                data: req.body
            }).then((result: any) => {
                res.status(201).json(result)
                return
            }).catch((err: any) => {
                if(err.code === 'P2002') {
                    res.status(409).json({409: 'Already exists'})
                    return
                }else{
                    next(err)
                }
            })
        } catch (err) {
            next(err)
        }
    }
}