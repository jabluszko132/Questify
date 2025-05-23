import { z } from 'zod';

export const QuestsSchema = z.object({
    id: z.number(),
    questlist_id: z.number(),
})