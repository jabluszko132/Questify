import { Request, Response, NextFunction } from 'express'
import { ZodObject } from "zod";

export function getEntityValidationMiddleware(entity: ZodObject<any>) {
    return (req: Request,res: Response,next: NextFunction) => {
        try {
            const data = entity.safeParse(req.body);
            if(data.success){
                next()
            }else{
                res.status(400).json({"400": "Bad request", "errors": data.error.errors})
                return
            }
        }catch(err){
            next(err)
        }
    }
}