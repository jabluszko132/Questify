import Router, {Request, Response, NextFunction} from 'express';
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import bcrypt from "bcrypt";
import { AuthReq } from '../models/passwords';

const passwordsRouter = Router();
passwordsRouter.post('/:username/:password', [getEntityValidationMiddleware(AuthReq)], async (req: Request, res: Response, next: NextFunction) => {
    const results = await prisma.passwords.findFirst({
        where: {
            user: {
                username: req.params.username
            }
        },
        include: {
            user: true
        }
    })
    
    if (!results) {
        // res.status(404).json({"error": "User not found"});
        res.status(404).end("User not found");
        return;
    }

    const isPasswordValid = await bcrypt.compare(req.params.password, results.hash);
    if (!isPasswordValid) {
        // res.status(401).json({"error": "Invalid password"});
        res.status(401).end("Invalid password");
        return;
    }

    res.status(200).json({
        user_id: results.user.id,
        username: results.user.username,
        email: results.user.email
    });
})

export default passwordsRouter;