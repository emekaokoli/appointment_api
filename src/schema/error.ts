import { type OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { z } from 'zod';

export function error(description: string): OpenAPIV3.ResponseObject {
  return {
    description,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  } as const;
}

export const errorResponseSchema = z
  .object({
    message: z.string(),
  })
  .openapi({
    description: 'An error occurred',
  });
