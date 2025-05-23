import { z } from 'zod';

export const QuestlistsSchema = z.object({
    id: z.number(),
})