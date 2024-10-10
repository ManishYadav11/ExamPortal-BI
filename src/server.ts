import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './dbConfig/dbConfig';
import { userRouter } from './routes/user.routes'; 
import {questionRouter} from './routes/question.routes'  ;
import {responseRouter} from './routes/response.routes' ;
import { testRouter } from './routes/test.routes';


dotenv.config();

const app = express();

app.use(express.json());

const PORT: string = process.env.PORT || '5000';


// User routes
app.use('/user', userRouter);

//Question routes
app.use('/question' , questionRouter) ;

//Response routes
app.use('/response' , responseRouter) ;

//Test routes
app.use('/test', testRouter);

async function startServer() {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
