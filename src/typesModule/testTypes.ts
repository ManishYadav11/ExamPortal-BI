export enum ITestType {
    QUIZ = "Quiz",
    EXAM = "Exam",
    ASSIGNMENT = "Assignment"
}

export interface ITestModel extends Document {
    Testname: string;
    Testdescription: string;
    Testtype: ITestType; 
    Topics: string; 
}
