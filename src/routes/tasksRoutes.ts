import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/auth.middleware";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(authMiddleware); // Protege todas as rotas

taskRoutes.post("/", taskController.create);
taskRoutes.get("/", taskController.list);
taskRoutes.get("/:id", taskController.retrieve);
taskRoutes.patch("/:id", taskController.update);
taskRoutes.delete("/:id", taskController.delete);

export default taskRoutes;
