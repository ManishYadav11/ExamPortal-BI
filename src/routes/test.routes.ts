import { Router } from 'express';
import {createTest ,getTests,  updateTest , deleteTest } from '../controller/testController';
import { asyncMiddleware} from '../middleware/asyncMiddleware';
import { verifyAuthMiddleware , checkAdminMiddleware } from '../middleware/authMiddleware';

const testRouter = Router();

testRouter.post('/create/test',asyncMiddleware(verifyAuthMiddleware) ,  asyncMiddleware(createTest));
testRouter.get('/getAll/test', asyncMiddleware(verifyAuthMiddleware) ,  asyncMiddleware(getTests));
testRouter.patch('/update/test/:id',asyncMiddleware(verifyAuthMiddleware) ,  asyncMiddleware(updateTest)) ;
testRouter.delete('/delete/test/:id', asyncMiddleware(verifyAuthMiddleware) , asyncMiddleware(deleteTest));

export { testRouter } ;
