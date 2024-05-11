import { v4 as uuid } from 'uuid'

export const bookController = (BOOKS) => {
  const getBooks = (_request, response) => {
    return response.json(BOOKS)
  }

  const createBook = (request, response, next) => {
    const newBook = request.body
    const books = structuredClone(BOOKS)
    try {
      if(!newBook.title || !newBook.author) {
        throw new Error('Title and author are required')
      }
      books.push({
        id: uuid(),
        ...newBook
      })
      return response.status(200).json(books)
    } catch (error) {
      next(error)
    }
  }

  const getBookById = (request, response) => {}

  return {
    getBooks,
    createBook,
    getBookById
  }
}