import { z } from 'zod';

export const QuestlistsSchema = z.object({
    title: z.string(),
})

export const QuestlistsReq = z.object({
    user_id: z.number(),
    title: z.string(),
})