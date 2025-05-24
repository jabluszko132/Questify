import { z } from 'zod';

export const FriendsSchema = z.object({
    user1_id: z.number(),
    user2_id: z.number(),
});

export const FriendsReq = z.object({
    user2_id: z.number(),
})