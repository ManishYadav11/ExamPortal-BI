import express, { Request, Response } from 'express';
import { TestModel } from '../model/test.model';
import { ITestModel } from '../typesModule/testTypes';

export const createTest = async (req: Request, res: Response): Promise<Response<ITestModel>> => {
    const { Testname, Testdescription, Testtype, Topics } = req.body;

    if(!Testname || !Testdescription || !Testtype || !Topics) {
        return res.status(400).json({ 
            message: 'Please fill in all fields' 
        });
    }

    try {
        const newTest = new TestModel({
            Testname,
            Testdescription,
            Testtype,
            Topics,
        });

        const savedTest = await newTest.save();
        return res.status(201).json(savedTest);
    } catch (error : any) {
        return res.status(500).json({
             msg: "Error creating test", error: error.message
        });
    }
};

export const getTests = async (req: Request, res: Response): Promise<Response<ITestModel[] | ITestModel>> => {
    try {
        const getTest = await TestModel.find() ;

        if(!getTest){
            return res.status(404).json({
                message:"No test Found"
            }) ;
        }
        return res.json({
            message : "Test found Successfully" ,
            test : getTest 
        }) ;
        
    } catch (error : any) {
        return res.status(404).json({
            message: 'No tests found'
        }) ;
    }
}
    
export const updateTest = async (req: Request, res: Response): Promise<Response<ITestModel>> => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTest = await TestModel.findByIdAndUpdate(
            id,
            { $set: updates }, 
            { new: true, runValidators: true }) ;

        if (!updatedTest) {
            return res.status(404).json({ msg: "Test not found" });
        }

        return res.status(200).json({
            message: "Test updated successfully",
            TestUpdated: updatedTest
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error updating test", 
            error: error.message 
        });
    }
};

export const deleteTest = async (req: Request, res: Response): Promise<Response<{ message: string }>> => {
    const { id, name } = req.params;

    try {
        let deletedTest;

        if (id) {
            deletedTest = await TestModel.findByIdAndDelete(id);
        } else if (name) {
            deletedTest = await TestModel.findOneAndDelete({ Testname: name });
        }

        if (!deletedTest) {
            return res.status(404).json({ 
                message: "Test not found" 
            });
        }

        return res.status(200).json({
             msg: "Test deleted successfully" 
        });
    } catch (error : any) {
        return res.status(500).json({ 
            message: "Error deleting test", 
            error: error.message });
    }
};
