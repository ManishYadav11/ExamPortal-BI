import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { QuestionModel } from '../model/question.model'; 
import { IQuestion, ISuccessResponse, IErrorResponse } from '../typesModule/questionTypes'; 

// Function to create a new question
export const createQuestion = async (req: Request<unknown, unknown, IQuestion>, res: Response<ISuccessResponse | IErrorResponse>): Promise<Response<ISuccessResponse | IErrorResponse>> => {
  const { question, options, correctAnswer, QuestionLevel, Topic } = req.body;

  if (!question || !options || !correctAnswer || !QuestionLevel) {
    return res.status(400).json({ error: 'All required fields must be provided.' });
  }

  try {
    
    const newQuestion = new QuestionModel({
      question,
      options,
      correctAnswer,
      QuestionLevel,
      Topic,
    });

    const savedQuestion = await newQuestion.save();  

    return res.status(201).json({ 
      message: 'Question created successfully!', 
      question: savedQuestion 
    });
  } catch (error : any) {
    return res.status(500).json({
       error: error.message 
      });
  }
};

// Function to delete a question by ID
export const deleteQuestion = async (req: Request<{ id: string }>, res: Response<ISuccessResponse | IErrorResponse>): Promise<Response<ISuccessResponse | IErrorResponse>> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
       error: 'Invalid question ID.'
       });
  }

  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ 
        error: 'Question not found.' 
      });
    }

    return res.status(200).json({ 
      message: 'Question deleted successfully!', 
      question: deletedQuestion 
    });
  } catch (error: any) {
    return res.status(500).json({
       error: error.message
       });
  }
};

// Function to fetch all questions
export const getQuestions = async (req: Request, res: Response<ISuccessResponse | IErrorResponse>): Promise<Response<ISuccessResponse | IErrorResponse>> => {
  try {
    const questions: IQuestion[] = await QuestionModel.find();

    return res.status(200).json({ 
    message: 'Questions fetched successfully!', 
      questions 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

