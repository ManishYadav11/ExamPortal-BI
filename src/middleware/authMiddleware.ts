import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/user.model"; 

interface IAuthRequest extends Request {
    auth?: any;
}

export const verifyAuthMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const isVerifiedtoken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.auth = isVerifiedtoken; 

    const fetchedUser = await UserModel.findById(req.auth.id).select("-password");
    if (!fetchedUser) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.auth.role = fetchedUser.role; 

    next(); 
  } catch (err) {
    console.error(err);
    return res.status(401).json({ 
        message: "Token is not valid" 
    });
  }
};

export const checkAdminMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (req.auth?.role !== "Admin") {
    return res.status(403).json({
        message: "Only Accessible by Admin." });
  }
  next(); 
};
