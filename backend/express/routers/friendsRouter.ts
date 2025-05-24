import Router, {Request, Response, NextFunction} from 'express';
import {
    getCreateMiddleware,
    getReadAllByParamMiddleware,
    getReadByIdParamMiddleware
} from "../middleware/universalCrud";
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import {FriendsSchema} from "../models";

const friendsRouter = Router();

friendsRouter.post('/', [getEntityValidationMiddleware(FriendsSchema)], (req: Request, res: Response, next: NextFunction) => {
    prisma.friends.createMany({
        data: [
            {
                user1_id: req.body.user1_id,
                user2_id: req.body.user2_id,
            },
            {
                user1_id: req.body.user2_id,
                user2_id: req.body.user1_id,
            },
        ]
    }).then((result: any) => {
        res.status(201).end(JSON.stringify(result));
    }).catch((err: any) => {
        next(err);
    })
})

friendsRouter.get('/:user1_id', [getReadAllByParamMiddleware( 'user1_id', prisma.friends)])

friendsRouter.delete('/:user1_id/:user2_id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.user1_id || !req.params.user2_id) {
        res.status(400).end("Bad request");
        return;
    }
    try {
        prisma.friends.deleteMany({
            where: {
                OR: [
                    {
                        AND:
                            {
                                user1_id: {
                                    equals: parseInt(req.params.user1_id),
                                },
                                user2_id: {
                                    equals: parseInt(req.params.user2_id),
                                }
                            },
                    },
                    {
                        AND:
                            {
                                user1_id: {
                                    equals: parseInt(req.params.user2_id),
                                },
                                user2_id: {
                                    equals: parseInt(req.params.user1_id),
                                }
                            },
                    }
                ]
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

export default friendsRouter;