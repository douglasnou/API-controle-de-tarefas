import express from "express";
import helmet from "helmet";
import taskRoutes from './routes/tasksRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { errorHandler } from "./middlewares/errorHalndler.js";
import { userRoutes } from "./routes/userRoutes.js";

export const app = express();

app.use(helmet());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);
app.use(userRoutes);

app.use(errorHandler);