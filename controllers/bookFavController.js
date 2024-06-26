import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const bookFavController = () => {
  const markAsFavorite = async (request, response, next) => {
    const { body } = request
    const bookId = Number(body?.bookId ?? null)
    const userId = Number(body?.userId ?? null)

    try {
      const favoriteBook = await prisma.usersFavoriteBooks.create({
        data: {
          bookId,
          userId
        }
      })

      return response.status(httpStatus.CREATED).json(favoriteBook)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAllFavoriteBooks = async (request, response, next) => {
    const { query } = request
    const userId = Number(query?.id)

    try {
      const favoriteBooks = await prisma.usersFavoriteBooks.findMany({
        where: {
          userId
        },
        select: {
          bookId: true,
          userId: true,
          book: {
            select: {
              title: true,
            }
          },
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        },
      })

      return response.status(httpStatus.OK).json(favoriteBooks)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getAllFavoriteBooksById = async (request, response, next) => {
    const { params } = request
    const userId = Number(params?.id)

    try {
      const favoriteBooks = await prisma.usersFavoriteBooks.findMany({
        where: {
          userId
        },
        select: {
          bookId: true,
          userId: true,
          book: {
            select: {
              title: true,
            }
          },
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        },
      })

      return response.status(httpStatus.OK).json(favoriteBooks)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    markAsFavorite,
    getAllFavoriteBooks,
    getAllFavoriteBooksById
  }
}