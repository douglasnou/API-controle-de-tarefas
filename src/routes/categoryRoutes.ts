import { Router } from "express";
import { createCategory, deleteCategory } from "../controllers/categoryController";
import { validateSchema } from "../middlewares/zodValidationMiddleware";
import { createCategorySchema } from "../schemas/categorySchema";

const router = Router();

router.post("/", validateSchema(createCategorySchema), createCategory);
router.delete("/:id", deleteCategory);

export default router;
