import { z } from 'zod';

export const QuestDetailsSchema = z.object({
    id: z.number(),
    description: z.string(),
    completed: z.boolean(),
})