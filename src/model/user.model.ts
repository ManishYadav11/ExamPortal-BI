import mongoose , {Document , Model , Schema} from 'mongoose' ;

export interface IUserDetails{
    name: string ;
    username:string;
    email: string;
    password:string ;
    role: 'Admin' | 'User' ;
}

const UserSchema : Schema<IUserDetails> = new Schema({
    name:{
        type:String ,
        required:true ,
        },
    username:{
        type:String ,
        required:true ,
        unique:true ,
    },
    email:{
        type:String ,
        required:true ,
        unique:true ,
      },

    password:{
        type:String ,
        required:true ,
      },

    role:{
        type:String ,
        enum: ['Admin' , 'User'],
        default: 'User',
    }
}) ;

export const UserModel = mongoose.model<IUserDetails>('UserModel', UserSchema);

