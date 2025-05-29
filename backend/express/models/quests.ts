import { z } from 'zod';

export const QuestsSchema = z.object({
    questlist_id: z.number(),
    description: z.string()
})