import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.errors.map(e => ({
        code: e.code,
        expected: e.expected,
        received: e.received,
        path: e.path,
        message: e.message
      }))
    });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
