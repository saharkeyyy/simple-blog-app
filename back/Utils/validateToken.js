import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { catchAsync } from './catchAsync.js';
import HandleERROR from './HandleError.js';
 const validateToken=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(' ')[1]
    }
   const isVerify=jwt.verify(token,process.env.JWT_SECRET)
    const userValidate=await User.findById(isVerify.id)
    if(userValidate.role!=='admin'){
        next(new HandleERROR('you are not admin',401))
    }
    next()

})  
export default validateToken
