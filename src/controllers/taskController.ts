import { Request, Response } from "express";
import { prisma } from "../database/prisma.js";

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, content, categoryId } = req.body;
    const userId = res.locals.user.id;

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId, userId },
      });

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const task = await prisma.task.create({
      data: {
        title,
        content,
        categoryId,
        userId,
      },
    });

    return res.status(201).json(task);
  }

  async list(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const { categoryId } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        categoryId: categoryId ? Number(categoryId) : undefined,
      },
      include: {
        category: true,
      },
    });

    return res.json(tasks);
  }

  async retrieve(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: "This user is not the task owner" });
    }

    return res.json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: "This user is not the task owner" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.json(updatedTask);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: "This user is not the task owner" });
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  }
}
