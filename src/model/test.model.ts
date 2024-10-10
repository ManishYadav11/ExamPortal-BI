import mongoose, { Document, Schema, Model } from "mongoose";
import {ITestModel , ITestType}  from  '../typesModule/testTypes'

const TestSchema: Schema<ITestModel> = new Schema({
    Testname: {
        type: String,
        required: true
    },
    Testdescription: {
        type: String,
        required: true
    },
    Testtype: {
        type: String,
        required: true,
        enum: Object.values(ITestType), 
    },
    Topics: {
        type: String, 
        required: true,  
    },
}, {
    timestamps: true, 
});

export const TestModel: Model<ITestModel> = mongoose.model<ITestModel>("TestModel", TestSchema);
