import { Router } from "express";
import { getTasks, getTaskById, updateTask, deleteTask, createTask } from "../controllers/taskController";
import { validateSchema } from "../middlewares/zodValidationMiddleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema";

const router = Router();

router.post("/", validateSchema(createTaskSchema), createTask);
router.get("/", getTasks); 
router.get("/:id", getTaskById);
router.patch("/:id", validateSchema(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
