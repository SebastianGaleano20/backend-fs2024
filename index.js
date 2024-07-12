import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressjwt as ejwt } from 'express-jwt'
import { bookRoutes } from './routes/bookRouter.js'
import bookFavRouter from './routes/bookFavRouter.js'
import userRouter from './routes/userRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import { upload } from './utils/uploadFiles.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

const app = express()
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))

app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).send('Upload failed')
    }
    res.status(200).json({ message: req.file })
  })
})

app.use(ejwt({
  secret: process.env.SECRET_KEY,
  algorithms: ['HS256'],
}).unless({
  path: ['/api/login', '/api/register', '/api/refresh-token'],
})
)

app.use('/api', bookRoutes(), userRouter, bookFavRouter)
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
