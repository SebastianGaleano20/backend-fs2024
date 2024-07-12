import { Router } from 'express'
import { bookController } from '../controllers/bookController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyBookSchema, updateBookSchema } from '../schemas/bookSchemas.js'
import { isAdmin } from '../middlewares/checkRole.js'

export const bookRoutes = () => {
  const bookRouter = Router()
  const { getBooks, createBook, getBookById, deleteById, updateById } = bookController()

  bookRouter.route('/books')
    .get(getBooks)
    .post(isAdmin, createBook)

  bookRouter.route('/books/:id')
    .get(getBookById)
    .delete(deleteById)
    .patch(updateById)

  return bookRouter
}