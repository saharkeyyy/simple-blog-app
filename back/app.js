import  express  from "express";
import cors from 'cors'
import morgan from "morgan";
import cookieParser from 'cookie-parser';


import userRouter from "./Routes/userRouter.js";
import postRouter from "./Routes/postRouter.js";
const app=express()
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(morgan('dev'));
//Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/user',userRouter)
app.use('/api/v1/post',postRouter)
export default app