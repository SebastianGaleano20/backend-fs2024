import HTTP_STATUS from "../helpers/httpStatus.js";
import { verifyToken } from "../utils/tokenManagement.js";

export const isAdmin = (request, response, next) => {
  const headers = request.headers;

  if (!headers.authorization) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const [, token] = headers.authorization.split(" ");

  const { role } = verifyToken(token);
  const ADMIN_ROLE = 'ADMIN'
  if (role !== ADMIN_ROLE) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Anda pa' llá bobo",
    });
  }

  next();
}