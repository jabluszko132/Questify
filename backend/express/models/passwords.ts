import { z } from "zod";

export const PasswordsSchema = z.object({
    user_id: z.number(),
    hash: z.string()
});

export const PasswordsReq = z.object({
    hash: z.string()
});