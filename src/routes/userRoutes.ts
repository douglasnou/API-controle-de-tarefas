import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { loginSchema, userSchema } from "../schemas/user.schemas";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", validateBody(userSchema), userController.create);
userRoutes.post("/users/login", validateBody(loginSchema), userController.login);
userRoutes.get("/users/profile", authMiddleware, userController.profile);

export { userRoutes }; 