import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        errors: [{
          code: "invalid_type",
          expected: "string",
          message: "Name is required and must be a string",
          path: ["name"],
          received: typeof name
        }]
      });
    }

    const existingCategory = await prisma.category.findFirst({
      where: { name }
    });

    if (existingCategory) {
      return res.status(409).json({ message: 'Category with this name already exists' });
    }

    const category = await prisma.category.create({
      data: { name }
    });

    return res.status(201).json({
      id: category.id,
      name: category.name
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid or missing category ID. It must be a valid number.' });
    }

    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await prisma.category.delete({ where: { id: Number(id) } });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
