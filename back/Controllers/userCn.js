import HandleERROR from "../Utils/HandleError.js";
import User from "../models/userModel.js";
import { catchAsync } from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import token from "jsonwebtoken";
import ApiFeatures from "../Utils/Apifeatures.js";
import adminCheck from "../middleware/adminCheck.js";
 export const deleteUser=catchAsync(async (req,res)=>{   
 });

 export const updateUser=catchAsync(async (req,res)=>{   
});
export const getAllUsers=catchAsync(async (req,res,next)=>{ 
 
  const features = new ApiFeatures(User, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({ status: 200, data: users });
});


export const register = catchAsync(async (req, res, next) => {
  const { username, password, email } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return next(new HandleERROR('User already exists', 401));
  }

  // Hash password before saving to the database
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({
      status: 'success',
      message: 'Registered successfully',
  });
});

  // If both email and password are validated successfully
  // Proceed with your login logic here
  export const login = catchAsync(async (req, res,next) => {
    const { email, password } = req.body;
    const validateUser = await User.findOne({ email });
    console.log(validateUser);
    if (!validateUser) {
      res.status(401).json({
        status: "failed",
        message: "email not found",
      });
    }
    const validatePassword = bcrypt.compareSync(
      password,
      validateUser.password
    );
    if (!validatePassword) {
      res.status(401).json({
        status: "failed",
        message: "email or password not correct",
      });
    }
    const token = jwt.sign({ id: validateUser.id }, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      data: {
        token,
        username: validateUser.username,
      },
    });
  
})
export const getProfile = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(401).json({ message: "Invalid token" });
      }

      res.status(200).json({
          status: 'success',
          data: { user },
      });
  });
});

