import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import { errorHandler } from './errors';
import { usersRoutes } from './routes/users.routes';
import { loginRoutes } from './routes/login.routes';
import { categoriesRoutes } from './routes/categories.routes';
import { realEstateRoutes } from './routes/realEstates.route';
import { scheduleRoutes } from './routes/schedules.routes';

const app: Application = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoriesRoutes);
app.use('/realEstate', realEstateRoutes);
app.use('/schedules', scheduleRoutes);

app.use(errorHandler);
export default app;
