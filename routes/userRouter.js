import { Router } from 'express'
import { userController } from '../controllers/userController.js'

const userRouter = Router()
const { register, login, profile, refreshToken } = userController()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/profile/:id', profile)
userRouter.post('/refresh-token', refreshToken)

export default userRouter