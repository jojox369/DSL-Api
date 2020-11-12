import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import './database';

import routes from './routes';
import errorHandler from './errors/handler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🏃 Running Server On Port ${PORT}`);
});
