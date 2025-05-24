import { Request, Response, NextFunction } from 'express'

export function getReadByIdParamMiddleware(idName: string, prismaSchema: any, isString?: boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!(idName in req.params)) {
                res.status(400).end("Bad request")
                return
            }
            prismaSchema.findUnique({
                where: {
                    [idName]: isString ? req.params[idName] : parseInt(req.params[idName])
                }
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
            next(err)
        }
    }
}

export function getReadAllByParamMiddleware(idName: string, prismaSchema: any, isString?: boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!(idName in req.params)) {
                res.status(400).end("Bad request")
                return
            }
            prismaSchema.findMany({
                where: {
                    [idName]: isString ? req.params[idName] : parseInt(req.params[idName])
                }
            }).then((result: any) => {
                if(result.length > 0){
                    res.status(200).end(JSON.stringify(result))
                }else{
                    res.status(404).end(JSON.stringify({ "404": "Not found" }));
                }
                return
            }).catch((err: any) => {
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
}
