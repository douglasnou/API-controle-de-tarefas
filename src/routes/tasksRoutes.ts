import { Router } from "express";
import { TaskController } from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(authMiddleware); // Protege todas as rotas

taskRoutes.post("/", taskController.create);
taskRoutes.get("/", taskController.list);
taskRoutes.get("/:id", taskController.retrieve);
taskRoutes.patch("/:id", taskController.update);
taskRoutes.delete("/:id", taskController.delete);

export default taskRoutes;
