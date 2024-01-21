import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

const userInput = z
  .object({
    email: z.string().email(),
    password: z.string(),
    date_of_birth: z.string(),
  })
  .strict();

export type UserRegisterationInput = z.infer<typeof userInput>;
export const userRegisterationInputSchema = generateSchema(userInput);
