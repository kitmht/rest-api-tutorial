import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import { PORT, MONGO_URL } from './config';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/', router());

app.listen(PORT, () => console.log(`server listen http://localhost:${PORT}`));

mongoose
  .connect(MONGO_URL)
  .then((res) => console.log('db connection success'))
  .catch((err) => console.log('db connection error'));
