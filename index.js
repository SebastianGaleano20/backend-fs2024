import express from 'express'
import dotenv from 'dotenv'
import { bookRoutes } from './routes/bookRouter.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

const app = express()
app.use(express.json())

app.use('/api', bookRoutes())
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
