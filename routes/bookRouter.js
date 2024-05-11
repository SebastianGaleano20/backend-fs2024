import { Router } from 'express'
import { bookController } from '../controllers/bookController.js'

export const bookRoutes = (BOOKS) => {
  const bookRouter = Router()
  const { getBooks, createBook, getBookById } = bookController(BOOKS)

  bookRouter.route('/books')
    .get(getBooks)
    .post(createBook)


  // bookRouter.route('/books/:id')
  //   .get((request, response) => {
  //     const { id } = request.params
  //     const book = BOOKS.find((book) => book.id === id)
  //     if (!book) {
  //       return response.status(404).json({ message: 'Book not found' })
  //     }
  //     return response.status(200).json(book)
  //   })
  //   .put((req, res) => {
  //     const { id } = req.params
  //     const books = structuredClone(BOOKS)
  //     const book = books.find((book) => book.id === id)
  //     if (!book) {
  //       return res.status(404).json({ message: 'Book not found' })
  //     }
  //     const updatedBook = req.body
  //     const index = books.indexOf(book)
  //     books.splice(index, 1, { id: book.id, ...updatedBook })
  //     return res.status(200).json(books)
  //   })
  //   .delete((req, res) => {
  //     const { id } = req.params
  //     const books = structuredClone(BOOKS)
  //     const book = books.find((book) => book.id === id)
  //     if (!book) {
  //       return res.status(404).json({ message: 'Book not found' })
  //     }
  //     const index = books.indexOf(book)
  //     books.splice(index, 1)
  //     return res.status(200).json(books)
  //   })


  return bookRouter
}