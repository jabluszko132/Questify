import { Request, Response, NextFunction } from 'express'
import { ZodObject } from "zod";

export function getEntityValidationMiddleware(entity: ZodObject<any>) {
    return (req: Request,res: Response,next: NextFunction) => {
        try {
            const data = entity.safeParse(req.body);
            if(data.success){
                next()
            }else{
                res.status(400).end(JSON.stringify({"Bad request": data.error.message}))
                return
            }
        }catch(err){
            next(err)
        }
    }
}