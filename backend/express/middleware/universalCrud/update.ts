import { Request, Response, NextFunction } from 'express'

export function getUpdateByParamIdMiddleware(idName: string, prismaSchema: any, isString?: boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!(idName in req.params)) {
                res.status(400).end("Bad request")
                return
            }
            prismaSchema.update({
                where: {
                    [idName]: isString ? req.params[idName] : parseInt(req.params[idName])
                },
                data: req.body
            }).then((result: any) => {
                res.status(200).end(JSON.stringify(result))
                return
            }).catch((err: any) => {
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
}