import { Router } from 'express';
import { createQuestion , deleteQuestion , getQuestions } from '../controller/questionController';
import { asyncMiddleware} from '../middleware/asyncMiddleware';
import { verifyAuthMiddleware , checkAdminMiddleware } from '../middleware/authMiddleware';

const questionRouter = Router();


questionRouter.post('/create/questions', asyncMiddleware(verifyAuthMiddleware) , asyncMiddleware(createQuestion));

questionRouter.get('/getAll/questions', asyncMiddleware(verifyAuthMiddleware) ,asyncMiddleware(getQuestions));

questionRouter.delete('/delete/:id', asyncMiddleware(verifyAuthMiddleware) , asyncMiddleware(deleteQuestion));


export { questionRouter } ;
