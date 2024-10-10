import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user.model';
import { IRegisterUser, ILoginUser, IJwtPayload } from '../typesModule/userTypes';
import dotenv from 'dotenv';

dotenv.config(); 

export const registerUser = async (req: Request<{}, {}, IRegisterUser>, res: Response) : Promise<Response>=> {
  const { name, username, email, password, role } = req.body;

  try {
    const newUser = new UserModel({
      name,
      username,
      email,
      password, 
      role,
    });

    await newUser.save();
    return res.status(201).json({ 
      message: 'User registered successfully', 
      createdUser: newUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });
  }
};
 
export const loginUser = async (req: Request<{}, {}, ILoginUser>, res: Response) : Promise<Response> => {
  const { email, password } = req.body;

  try {
    const userPresent = await UserModel.findOne({ email });
    if (!userPresent) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    if (userPresent.password !== password) {
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }

    const userId = userPresent._id.toString();
    const token = jwt.sign({ 
      id: userId, role: userPresent.role } as IJwtPayload, process.env.JWT_SECRET as string, { expiresIn: '1h' }
    );

    return res.status(200).json({
      message : "Login SuccessFull" ,
      jwtToken: token 
    });
  } catch (error: any) {  
    return res.status(500).json({ 
      message: 'Error logging in', 
      error: error.message 
    });
  }
};
