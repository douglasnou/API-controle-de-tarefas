import { Request, Response } from "express";
import { prisma } from "../database/prisma.js";

export class CategoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const userId = res.locals.user.id;

    const category = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.userId !== userId) {
      return res.status(403).json({ message: "This user is not the category owner" });
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  }
}
