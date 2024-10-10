import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
  QuestionLevel: string; 
  Topic: string; 
}

const QuestionSchema: Schema<IQuestion> = new Schema({
  question: { 
    type: String, 
    required: true 
  },
  options: {
    type: [String], 
    required: true 
  },
  correctAnswer: { 
    type: String, 
    required: true 
  },
  QuestionLevel: {
    type: String,
    required: true
  },
  Topic: {
    type: String,
  }
});

export const QuestionModel = mongoose.model<IQuestion>('Question', QuestionSchema);
