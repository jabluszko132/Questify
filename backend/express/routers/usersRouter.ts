import Router, {Request, Response, NextFunction} from 'express';
import {
    getCreateMiddleware,
    getReadAllByParamMiddleware,
    getReadByIdParamMiddleware
} from "../middleware/universalCrud";
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import {UsersReq} from "../models";
import bcrypt from "bcrypt";

const usersRouter = Router();
const SALT_ROUNDS = 10;

usersRouter.post('/', [getEntityValidationMiddleware(UsersReq)], async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email || !req.body.username || !req.body.password) {
        res.status(400).end("Bad request");
        return;
    }
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await prisma.users.create({
        data: 
            {
                username: username,
                email: email,
                password: {
                    create: {
                        hash: hashedPassword
                    }
                }
            },
        include: {
            password: true
        }
    }).then((result: any) => {
        console.log(`User '${username}' registered.`);
        res.status(201).end(JSON.stringify(result));
    }).catch((err: any) => {
        next(err);
    })
});

usersRouter.get('/:id', [getReadByIdParamMiddleware( 'id', prisma.users)])

usersRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id) {
        res.status(400).end("Bad request");
        return;
    }
    try {
        prisma.users.delete({
            where: {
                id: parseInt(req.params.id)
            },
        }).then((result: any) => {
            res.status(200).end(JSON.stringify(result));
        }).catch((err: any) => {
            next(err);
        })
    }catch(err){
        next(err)
    }
})

export default usersRouter;