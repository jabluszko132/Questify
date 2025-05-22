import { z } from 'zod';

export const AvatarsSchema = z.object({
  user_id: z.number(),
  hat_id: z.number(),
  glasses_id: z.number(),
  background_id: z.number(),
  frame_id: z.number()
});
