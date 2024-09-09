import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
 
    username:{
        type:String,
        unique:[true,'Username already exists'],
        required: true

    },
    email:{
      type:String,
      required: [true,"Please provide your Email"],
      match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'email invalid'],
      unique: true,

    },
    password:{
        type:String,
        required:true,
        minlength:[8,'min length 8 character'],
    },
    phone:{
        type:Number,
        min:[10000000,'min length 8 character'],
        max:[9999999999,'max length 8 character']
    },
    region:{
        type:String,
    },
    role:{       
         type:String,
        enum:['admin','user'],
    }
 
},{timestamps:true})
    
// this method is used to generate and hash the password before saving it in database

const   User=mongoose.model('User',userSchema)
export default User 


