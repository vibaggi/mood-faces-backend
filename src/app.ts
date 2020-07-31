import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import healthRouter from './routes/health';
import usersRoute from './routes/users';

import errorHandler from './lib/handlers/error_handling';
import notFoundHandler from './lib/handlers/not_found';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(healthRouter);
app.use('/users', usersRoute);

app.use(notFoundHandler);
app.use(errorHandler);

export default app; 