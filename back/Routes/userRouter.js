import  express  from "express";
import {  deleteUser, getAllUsers, getProfile, login,  register, updateUser } from "../Controllers/userCn.js";
const userRouter = express.Router()
userRouter.route('/').get(getAllUsers).post(login)
userRouter.route('/:id').delete(deleteUser).patch(updateUser)
userRouter.route('/register').post(register)
userRouter.route('/profile').get(getProfile)
export default userRouter;

