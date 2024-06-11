import { Router } from 'express'
import { bookController } from '../controllers/bookController.js'

export const bookRoutes = () => {
  const bookRouter = Router()
  const { getBooks, createBook, getBookById, deleteById, updateById } = bookController()

  bookRouter.route('/books')
    .get(getBooks)
    .post(createBook)

  bookRouter.route('/books/:id')
    .get(getBookById)
    .delete(deleteById)
    .patch(updateById)

  return bookRouter
}