import httpStatus from '../helpers/httpStatus.js'

import { generateToken, verifyToken } from '../utils/tokenManagement.js'
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

      const token = generateToken({data:{ email, role: user.role }})
      const refreshToken = generateToken({
        data:{ email, role: user.role },
        isRefresh: true,
        expiresIn: '7d'
      })


      return response.status(httpStatus.OK).json({
        message: 'Login successful',
        token,
        refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const refreshToken = async (request, response, next) => {
    const { refreshToken } = request.body

    try {
      const { role, email } = verifyToken(refreshToken, true)
      const token = generateToken({
        data:{ email, role, message: 'fressssco' }
      })

      return response.status(httpStatus.OK).json({
        success: true,
        token
      })
    } catch (error) {
      next(error)
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

  

  return {
    register,
    login,
    profile,
    refreshToken
  }
}