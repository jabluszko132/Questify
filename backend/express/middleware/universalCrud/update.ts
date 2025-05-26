import { Request, Response, NextFunction } from 'express'

export function getUpdateByParamIdMiddleware(idName: string, prismaSchema: any, isString?: boolean) {
    if(!prismaSchema) throw new Error(`Prisma schema not provided. Got ${prismaSchema} instead.`);
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
                if(result){
                    res.status(200).json(result)
                }else{
                    res.status(404).json({ "404": "Not found" });
                }
                return
            }).catch((err: any) => {
                next(err)
            })
        } catch (err) {
            res.status(500)
            next(err)
        }
    }
}