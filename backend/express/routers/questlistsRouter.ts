import Router, {Request, Response, NextFunction} from 'express';
import {
    getReadAllByParamMiddleware,
    getReadByIdParamMiddleware
} from "../middleware/universalCrud";
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import {QuestlistsReq} from "../models";

const questlistsRouter = Router();

questlistsRouter.post('/', [getEntityValidationMiddleware(QuestlistsReq)], (req: Request, res: Response, next: NextFunction) => {
    const { title, user_id } = req.body;
    if (!title || !user_id) {
        res.status(400).json({ error: 'Missing title or user_id' });
        return;
    }

    prisma.questlists.create({
        data: {
          title: title,
          Users_questlists: {
            create: {
              user_id: user_id,
            },
          },
        },
      }).then((result: any) => {
        res.status(201).json(result).end();
    }).catch((err: any) => {
        next(err);
    })
})

questlistsRouter.get('/:id', [getReadByIdParamMiddleware( 'id', prisma.questlists )])

questlistsRouter.delete('/:user_id/:questlist_id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.user_id || !req.params.questlist_id) {
        res.status(400).end("Bad request");
        return;
    }
    try {
        prisma.questlists.deleteMany({
            where: {
                AND: {
                    id: {
                        equals: parseInt(req.params.questlist_id),
                    },
                    Users_questlists: {
                        some: {
                            user_id: parseInt(req.params.user_id),
                        },
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

export default questlistsRouter;