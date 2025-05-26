import { z } from 'zod';
import { PasswordsSchema } from './passwords';

export const UsersSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    password: PasswordsSchema
});

export const UsersReq = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
});