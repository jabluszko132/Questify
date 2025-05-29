import Router, {Request, Response, NextFunction} from 'express';
import {
    getReadAllByParamMiddleware
} from "../middleware/universalCrud";
import prisma from "../dbCon";
import {getEntityValidationMiddleware} from "../middleware/entityValidationMiddleware";
import {QuestsSchema} from "../models";

const questsRouter = Router();

questsRouter.post('/', [getEntityValidationMiddleware(QuestsSchema)], (req: Request, res: Response, next: NextFunction) => {
    const { description, questlist_id } = req.body;
    if (!description || !questlist_id) {
        res.status(400).json({ error: 'Missing description or questlist_id' });
        return;
    }
    prisma.quests.create({
        data: {
            questlist_id: questlist_id,
            quest_details: {
                create: {
                    description: description,
                },
            },
        },
    }).then((result: any) => {
        res.status(201).json(result).end();
    }).catch((err: any) => {
        next(err);
    })
})

questsRouter.get('/:questlist_id', [getReadAllByParamMiddleware( 'questlist_id', prisma.quests )])

questsRouter.delete('/:questlist_id/:quest_id', (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.questlist_id || !req.params.quest_id) {
        res.status(400).end("Bad request");
        return;
    }
    try {
        prisma.quests.deleteMany({
            where: {
                AND: {
                    questlist_id: {
                        equals: parseInt(req.params.questlist_id),
                    },
                    id: {
                        equals: parseInt(req.params.quest_id),
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

export default questsRouter;