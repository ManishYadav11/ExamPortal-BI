import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("DB_URI is not defined in the environment variables");
}

const connectToDb = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
        
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; 
    }
};

export { connectToDb };
