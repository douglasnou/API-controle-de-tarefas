import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};
