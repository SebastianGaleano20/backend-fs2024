import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const bookController = () => {
  const getBooks = async (request, response, next) => {
    const { query } = request

    try {
      const books = await prisma.books.findMany({
        where: {
          title: {
            contains: query?.title ?? ''
          }
        }
      })

      const responseFormat = {
        data: books,
        message: 'Books retrieved successfully'
      }

      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const createBook = async (request, response, next) => {
    const newBook = request.body

    try {
      const createdBook = await prisma.books.create({
        data: newBook
      })

      const responseFormat = {
        data: createdBook,
        message: 'Book created successfully'
      }

      return response.status(201).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getBookById = async (request, response, next) => {
    const { id } = request.params
    const bookId = Number(id)

    try {
      const book = await prisma.books.findUnique({
        where: {
          id: bookId
        }
      })

      const responseFormat = {
        data: book,
        message: 'Book retrieved successfully'
      }

      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteById = async (request, response, next) => {
    const { id } = request.params
    const bookId = Number(id)

    try {
      const book = await prisma.books.delete({
        where: {
          id: bookId
        }
      })

      const responseFormat = {
        data: book,
        message: 'Book deleted successfully'
      }

      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateById = async (request, response, next) => {
    const { id } = request.params
    const bookId = Number(id)
    const newBookData = request.body

    try {
      const book = await prisma.books.update({
        where: {
          id: bookId
        },
        data: newBookData
      })

      const responseFormat = {
        data: book,
        message: 'Book updated successfully'
      }

      return response.status(200).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getBooks,
    createBook,
    getBookById,
    deleteById,
    updateById
  }
}