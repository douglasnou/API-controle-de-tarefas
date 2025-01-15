import { Router } from "express";
import { UserController } from "../controllers/user.controllers.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", validateBody(userSchema), userController.create);
userRoutes.post("/users/login", validateBody(loginSchema), userController.login);
userRoutes.get("/users/profile", authMiddleware, userController.profile);

export { userRoutes }; 