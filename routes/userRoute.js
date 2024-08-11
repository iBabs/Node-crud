import { Router } from "express";
import { getMe, getUser, loginUser, registerUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const userRouter = Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/me',protect, getMe)

userRouter.get('/person/:_id', getUser)

export default userRouter