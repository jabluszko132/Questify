import { z } from 'zod';

export const QuestlistDetailsSchema = z.object({
    id: z.number(),
    description: z.string(),
    exp: z.number(),
})