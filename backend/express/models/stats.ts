import { z } from 'zod';

export const StatsSchema = z.object({
    user_id: z.number(),
    coins: z.number(),
    exp: z.number(),
    questsCompleted: z.number(),
})