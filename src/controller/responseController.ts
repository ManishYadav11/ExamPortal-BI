import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../model/user.model'; 
import { ResponseModel } from '../model/response.model'; 
import { QuestionModel } from '../model/question.model'; 
import { ISuccessResponse, IErrorResponse } from '../typesModule/responseTypes';

export const submitResponse = async (req: Request, res: Response): Promise<Response<ISuccessResponse | IErrorResponse>> => {
  const { userId, userEmail, username, questionId, answer } = req.body;

  if (!userId || !userEmail || !username || !questionId || !answer) {
    return res.status(400).json({
      error: 'All fields are required.'
    });
  }

  try {
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: 'Invalid userId.'
      });
    }

    
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found.'
      });
    }

    if (user.email !== userEmail || user.username !== username) {
      return res.status(400).json({
        error: 'User information does not match.'
      });
    }

    const getQuestionFromQuestionModel = await QuestionModel.findById(questionId);

    if (!getQuestionFromQuestionModel) {
      return res.status(404).json({
        error: 'Question not found.'
      });
    }

    const responseDocument = new ResponseModel({
      userId: user._id,          
      userEmail: user.email,
      username: user.username,
      questionId: getQuestionFromQuestionModel._id,  
      question: getQuestionFromQuestionModel.question, 
      answer,
    });

    const savedResponse = await responseDocument.save();

    const successResponse: ISuccessResponse = {
      message: 'Response submitted successfully!',
      response: {
        userId: savedResponse.userId.toString(),  
        userEmail: savedResponse.userEmail,
        username: savedResponse.username,
        questionId: savedResponse.questionId.toString(), 
        question: savedResponse.question,  
        answer: savedResponse.answer,
      }
    };

   
    return res.status(201).json(successResponse);

  } catch (error : any) {
    return res.status(500).json({
      error: error.message
    });
  }
};


export const getAllResponses = async (req: Request, res: Response): Promise<Response<ISuccessResponse | IErrorResponse>> => {
  try {
    
    const responses   = await ResponseModel.find()
      .populate('userId', 'username email')   
      .populate('questionId', 'question options correctAnswer'); 

    if (!responses.length) {
      return res.status(404).json({
        error: 'No responses found.'
      });
    }

    const successResponse = {
      message: 'Responses fetched successfully!',
      response: responses
    }

    return res.status(200).json(successResponse);

  } catch (error) {
    console.error('Error fetching responses:', error);
    return res.status(500).json({
      error: 'An error occurred while fetching the responses.'
    });
  }
};