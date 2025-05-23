import {z, ZodObject} from 'zod';

export const UsersQuestlistsSchema: ZodObject<any> = z.object({
    user_id: z.number(),
    questlist_id: z.number(),
})