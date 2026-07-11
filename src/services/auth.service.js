import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export const login = ({ email, password } = {}) => {
  if (!email || !password) throw new AppError('email y password son obligatorios', 400);
  if (!process.env.AUTH_EMAIL || !process.env.AUTH_PASSWORD || !process.env.JWT_SECRET) {
    throw new AppError('La autenticación no está configurada', 500);
  }
  if (email !== process.env.AUTH_EMAIL || password !== process.env.AUTH_PASSWORD) {
    throw new AppError('Credenciales inválidas', 401);
  }

  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
};
