import httpStatus from '../helpers/httpStatus.js'
import jwt from 'jsonwebtoken'

import { encrypt, verified } from '../utils/bcrypt.js'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const userController = () => {
  const register = async (request, response, next) => {
    const newUser = request.body
    const hashedPassword = await encrypt(newUser.password)
    newUser.password = hashedPassword

    try {
      const createdUser = await prisma.user.create({
        data: newUser
      })

      const responseFormat = {
        data: createdUser,
        message: 'User created successfully'
      }

      return response.status(httpStatus.CREATED).json(responseFormat)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const login = async (request, response, next) => {
    const { email, password } = request.body

    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return response.status(httpStatus.NOT_FOUND).json({
          message: 'Invalid credentials'
        })
      }

      const isPasswordValid = await verified(password, user.password)

      if (!isPasswordValid) {
        return response.status(httpStatus.UNAUTHORIZED).json({
          message: 'Invalid credentials'
        })
      }

      //* AQUI TENGO QUE GENERAR EL TOKEN

      const token = await generateToken({ email })

      return response.status(httpStatus.OK).json({
        message: 'Login successful',
        token
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const profile = async (request, response, next) => {
    const { id } = request.params
    const userId = Number(id)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      return response.status(httpStatus.OK).json({
        data: user
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const generateToken = async (data) => {
    const token = await jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: '1d'
    })

    return token
  }

  return {
    register,
    login,
    profile
  }
}