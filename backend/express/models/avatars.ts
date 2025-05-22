import { z } from 'zod';

export const AvatarsSchema = z.object({
  user_id: z.number(),
  hat_id: z.number().optional().nullable(),
  glasses_id: z.number().optional().nullable(),
  background_id: z.number().optional().nullable(),
  frame_id: z.number().optional().nullable(),
});

export const AvatarsReq = z.object({
  hat_id: z.number().optional().nullable(),
  glasses_id: z.number().optional().nullable(),
  background_id: z.number().optional().nullable(),
  frame_id: z.number().optional().nullable()
})