import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  finished: z.boolean().optional(),
  categoryId: z.number().optional(),
});
