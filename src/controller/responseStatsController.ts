import { Request, Response } from "express";
import { ResponseModel } from "../model/response.model";
import { QuestionModel } from "../model/question.model";

export const getResponseStats = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.query; 

    const stats = await ResponseModel.aggregate([
      {
        $match: userEmail ? { userEmail } : {}, 
      },
      {
        $lookup: {
          from: "questions", 
          localField: "questionId",
          foreignField: "_id",
          as: "questionDetails",
        },
      },
      {
        $unwind: "$questionDetails", 
      },
      {
        $addFields: {
          isCorrect: {
            $eq: ["$answer", "$questionDetails.correctAnswer"],
          },
        },
      },
      {
        $group: {
          _id: "$isCorrect", 
          totalResponses: { $sum: 1 }, 
        },
      },
      {
        $project: {
          _id: 0,
          isCorrect: "$_id", 
          totalResponses: 1, 
        },
      },
    ]);

    return res.status(200).json({
      message: "Response statistics calculated successfully",
      stats,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "An error occurred while calculating response statistics.",
      details: error.message,
    });
  }
};
