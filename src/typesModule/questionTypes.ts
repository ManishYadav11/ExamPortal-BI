
export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    QuestionLevel: string;
    Topic?: string; 
  }

  export interface ISuccessResponse {
    message: string;
    question?: IQuestion; 
    questions?: IQuestion[]; 
  }
  
  export interface IErrorResponse {
    error: string;
  }
  