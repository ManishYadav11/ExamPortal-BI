import mongoose from "mongoose";
export interface IResponse extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  username: string;
  questionId: mongoose.Types.ObjectId;
  question: string ;
  answer: string;
}
 
export interface ISuccessResponse {
    message: string;
    response: {
      userId: string;
      userEmail: string;
      username: string;
      questionId: string;
      question : string
      answer: string;
    };
  }
  
  export interface IErrorResponse {
    error: string;
  }
  