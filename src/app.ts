import express, { json } from "express";
import helmet from "helmet";
import taskRoutes from '../src/routes/tasksRoutes';
import categotyRoutes from '../src/routes/categoryRoutes';
import { errorHandler } from "./middlewares/errorHalndler";
import { userRoutes } from "./routes/userRoutes";

export const app = express();

app.use(helmet());
app.use(json());

app.use('/tasks', taskRoutes);
app.use('/categories', categotyRoutes);
app.use(userRoutes);

app.use(errorHandler);