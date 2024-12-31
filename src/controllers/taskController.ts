import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, categoryId, finished } = req.body;

        if (categoryId) {
            const category = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }

        const task = await prisma.task.create({
            data: { 
                title, 
                content, 
                categoryId,
                finished: finished ?? false,
            }
        });

        return res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
  
      const tasks = category
        ? await prisma.task.findMany({
            where: {
              category: {
                name: category as string,
              },
            },
            include: {
              category: true,
            },
          })
        : await prisma.task.findMany({
            include: {
              category: true,
            },
          });
  
      return res.status(200).json(
        tasks.map((task) => ({
          id: task.id,
          title: task.title,
          content: task.content,
          finished: task.finished,
          category: task.category ? { id: task.category.id, name: task.category.name } : null,
        }))
      );
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
        include: {
          category: true,
        },
      });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      return res.status(200).json({
        id: task.id,
        title: task.title,
        content: task.content,
        finished: task.finished,
        category: task.category ? { id: task.category.id, name: task.category.name } : null,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, content, categoryId, finished } = req.body;

        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) }
        });

        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (categoryId) {
            const category = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }

        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: { 
                title, 
                content, 
                categoryId, 
                finished: finished ?? existingTask.finished,
            }
        });

        return res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) }
        });

        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await prisma.task.delete({
            where: { id: Number(id) }
        });

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};
