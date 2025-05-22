import { z } from 'zod';

export const AttributeSchema = z.object({
  id: z.number(),
  filename: z.string(),
});

export const AttributeReq = z.object({
  filename: z.string(),
});