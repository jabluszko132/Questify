import { z } from "zod";

export const PasswordsSchema = z.object({
    user_id: z.number(),
    password: z.string(),
    salt: z.string()
});

export const PasswordsReq = z.object({
    password: z.string(),
    salt: z.string()
});