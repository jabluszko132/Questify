import { z } from 'zod';
import { PasswordsSchema } from './passwords';

export const UsersSchema = z.object({
    id: z.number(),
    nickname: z.string(),
    email: z.string(),
    password: PasswordsSchema
});

export const UsersReq = z.object({
    nickname: z.string(),
    email: z.string(),
    password: z.string()
});