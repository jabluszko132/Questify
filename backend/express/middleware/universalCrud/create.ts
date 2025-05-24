import { Request, Response, NextFunction } from 'express'

//TODO: check for unique constraints

export function getCreateMiddleware(prismaSchema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            prismaSchema.create({
                data: req.body
            }).then((result: any) => {
                res.status(201).json(result)
                return
            }).catch((err: any) => {
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
}