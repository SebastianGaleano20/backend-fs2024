import { Router } from 'express'
import { bookController } from '../controllers/bookController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyBookSchema, updateBookSchema } from '../schemas/bookSchemas.js'

export const bookRoutes = () => {
  const bookRouter = Router()
  const { getBooks, createBook, getBookById, deleteById, updateById } = bookController()

  bookRouter.route('/books')
    .get(getBooks)
    .post(schemaValidator(bodyBookSchema), createBook)

  bookRouter.route('/books/:id')
    .get(getBookById)
    .delete(deleteById)
    .patch(schemaValidator(updateBookSchema), updateById)

  return bookRouter
}