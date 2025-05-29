import Router, {Request, Response, NextFunction} from 'express';
import {
    getReadAllByParamMiddleware
} from "../middleware/universalCrud";
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import {UsersQuestlistsSchema} from "../models";

const usersQuestlistsRouter = Router();

usersQuestlistsRouter.post('/', [getEntityValidationMiddleware(UsersQuestlistsSchema)], (req: Request, res: Response, next: NextFunction) => {
    prisma.users_questlists.create({
        data: {
            user_id: req.body.user_id,
            questlist_id: req.body.questlist_id,
        }
    }).then((result: any) => {
        res.status(201).json(result).end();
    }).catch((err: any) => {
        next(err);
    })
})

usersQuestlistsRouter.get('/:user_id', [getReadAllByParamMiddleware( 'user_id', prisma.users_questlists)])

usersQuestlistsRouter.delete('/:user_id/:questlist_id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.user_id || !req.params.questlist_id) {
        res.status(400).end("Bad request");
        return;
    }
    try {
        prisma.users_questlists.deleteMany({
            where: {
                AND: {
                    user_id: {
                        equals: parseInt(req.params.user_id),
                    },
                    questlist_id: {
                        equals: parseInt(req.params.questlist_id),
                    }
                },
            }
        }).then((result: any) => {
            res.status(200).json(result);
        }).catch((err: any) => {
            next(err);
        })
    }catch(err){
        next(err)
    }
})

export default usersQuestlistsRouter;