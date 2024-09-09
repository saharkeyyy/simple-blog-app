import express from 'express'
import dotenv from 'dotenv'
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({path:'./config.env'})
const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(con=>{
    console.log('db connected')
})

const PORT=3001
app.listen(PORT,()=>{
    console.log('server start')
})