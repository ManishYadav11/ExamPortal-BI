import mongoose, { Schema, Document } from 'mongoose';
import { IResponse } from 'typesModule/responseTypes';

const ResponseSchema: Schema<IResponse> = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'UserModel' 
  },
  userEmail: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  questionId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Question' 
  },
  question: { 
    type: String, 
    required: true 
  },
  answer: { 
    type: String, 
    required: true 
  },
});


export const ResponseModel = mongoose.model<IResponse>('Response', ResponseSchema);
