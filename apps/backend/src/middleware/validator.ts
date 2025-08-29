import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodFormattedError } from 'zod';

import { ResponseBuilder } from '@/utils/response-builder';

type ValidationTarget = 'body' | 'params' | 'query' | 'headers';

interface ValidationEntry<T extends ZodSchema = ZodSchema> {
  target: ValidationTarget;
  schema: T;
}

export default function validator(entries: ValidationEntry[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Partial<Record<ValidationTarget, ZodFormattedError<unknown>>> = {};

    let hasError = false;

    for (const { target, schema } of entries) {
      const result = schema.safeParse(req[target]);

      if (!result.success) {
        hasError = true;
        errors[target] = result.error.format();
      } else {
        (req as unknown as Record<ValidationTarget, unknown>)[target] = result.data;
      }
    }

    if (hasError) {
      new ResponseBuilder(res).fail('Validation failed', errors).end();
    }

    next();
  };
}
