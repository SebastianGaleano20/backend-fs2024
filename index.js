import express from 'express'
import { BOOKS } from './data.js'
import dotenv from 'dotenv'
import { bookRoutes } from './routes/bookRouter.js'
import sayHello from './middlewares/sayHello.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

const app = express()
app.use(express.json())

app.use(sayHello)
app.use('/api', bookRoutes(BOOKS))
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
