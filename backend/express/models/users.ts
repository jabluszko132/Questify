import { z } from 'zod';

export const UsersSchema = z.object({
    id: z.number(),
    nickname: z.string(),
    email: z.string()
});

export const UsersReq = z.object({
    nickname: z.string(),
    email: z.string()
});