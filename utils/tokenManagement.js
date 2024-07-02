import jwt from 'jsonwebtoken'

export const generateToken = ({ data, expiresIn = '10s', isRefresh = false }) => {
  const secretKey = isRefresh ? process.env.REFRESH_SECRET_KEY : process.env.SECRET_KEY
  const token = jwt.sign(data, secretKey, {
    expiresIn
  })

  return token
}



export const verifyToken = (token, isRefresh = false) => {
  const secretKey = isRefresh ? process.env.REFRESH_SECRET_KEY : process.env.SECRET_KEY
  return jwt.verify(token, secretKey)
} 