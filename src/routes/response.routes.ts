import express , {Router} from 'express';
import { submitResponse , getAllResponses } from '../controller/responseController'; 
import { asyncMiddleware } from '../middleware/asyncMiddleware';
import { verifyAuthMiddleware , checkAdminMiddleware } from '../middleware/authMiddleware';
const responseRouter: Router = Router();

// Define the route for submitting answers
responseRouter.post('/submitAnswer', asyncMiddleware(verifyAuthMiddleware) , asyncMiddleware(submitResponse));
responseRouter.get('/getSubmission' , asyncMiddleware(verifyAuthMiddleware) , asyncMiddleware(getAllResponses));


export {responseRouter} ;
