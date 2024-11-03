import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    color: z.string(),
    passportId: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
