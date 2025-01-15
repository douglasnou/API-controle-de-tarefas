import { Router } from "express";
import { CategoryController } from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.use(authMiddleware); // Protege todas as rotas

categoryRoutes.post("/", categoryController.create);
categoryRoutes.delete("/:id", categoryController.delete);

export default categoryRoutes;
