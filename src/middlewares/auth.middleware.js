import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export const authenticateToken = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) return next(new AppError('Token de acceso requerido', 401));

  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Formato de autorización inválido. Use Bearer <token>', 401));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError' ? 'El token expiró' : 'Token inválido';
    return next(new AppError(message, 403));
  }
};
