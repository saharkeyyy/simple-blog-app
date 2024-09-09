import  express  from "express";
import { addPost, getAllPosta, updatePost } from "../Controllers/postCn.js";
import upload from "../Utils/upload.js";

const postRouter=express.Router();
postRouter.route('/').post(upload.single('file'),addPost).get(getAllPosta);
postRouter.route('/:id').patch(updatePost)
export default postRouter