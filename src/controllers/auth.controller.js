import * as AuthService from '../services/auth.service.js';

export const login = (req, res) => {
  const token = AuthService.login(req.body);
  res.json({ token, tokenType: 'Bearer' });
};
