import { ZodSchema, ZodError, ZodTypeAny   } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as typeof req.params;
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};