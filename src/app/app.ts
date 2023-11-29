import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);


const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);


app.use(globalErrorHandler)

app.use(notFound)

export default app;
