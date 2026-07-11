import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { login } from '../src/services/auth.service.js';
import { authenticateToken } from '../src/middlewares/auth.middleware.js';
import { notFoundHandler } from '../src/middlewares/error.middleware.js';

process.env.AUTH_EMAIL = 'admin@test.com';
process.env.AUTH_PASSWORD = 'secret';
process.env.JWT_SECRET = 'test-secret-with-enough-entropy';

test('login devuelve un JWT válido', () => {
  const token = login({ email: 'admin@test.com', password: 'secret' });
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  assert.equal(payload.email, 'admin@test.com');
});

test('login incorrecto genera un error 401', () => {
  assert.throws(
    () => login({ email: 'admin@test.com', password: 'incorrecta' }),
    (error) => error.statusCode === 401 && error.message === 'Credenciales inválidas',
  );
});

test('middleware sin token genera un error 401', () => {
  let receivedError;
  authenticateToken({ headers: {} }, {}, (error) => { receivedError = error; });
  assert.equal(receivedError.statusCode, 401);
});

test('middleware acepta un Bearer token válido', () => {
  const token = login({ email: 'admin@test.com', password: 'secret' });
  const req = { headers: { authorization: `Bearer ${token}` } };
  let receivedError;
  authenticateToken(req, {}, (error) => { receivedError = error; });

  assert.equal(receivedError, undefined);
  assert.equal(req.user.email, 'admin@test.com');
});

test('ruta desconocida devuelve 404', () => {
  const req = { method: 'GET', originalUrl: '/ruta-inexistente' };
  const result = {};
  const res = {
    status(code) { result.status = code; return this; },
    json(body) { result.body = body; return this; },
  };

  notFoundHandler(req, res);
  assert.equal(result.status, 404);
  assert.match(result.body.error, /Ruta no encontrada/);
});
