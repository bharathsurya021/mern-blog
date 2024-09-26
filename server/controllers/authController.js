import asyncHandler from 'express-async-handler';
import authService from '../services/authService.js';
import { setCookie, clearCookie } from '../utils/cookies.js';

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);
    const { _id, name, email, isAdmin } = user
    const userInfo = { userId: _id, name, email, isAdmin }

    res.status(201).json({ message: 'Registered successfully', data: { userInfo } });
  });

  login = asyncHandler(async (req, res) => {
    const { token, user } = await authService.login(req.body);
    const { _id, name, email, isAdmin } = user
    const userInfo = { userId: _id, name, email, isAdmin }
    setCookie(res, 'acesstoken', token);
    setCookie(res, 'userInfo', JSON.stringify(userInfo));

    res.status(200).json({ message: 'Login successful', data: { token, userInfo } });
  });

  logout = asyncHandler(async (req, res) => {
    clearCookie(res, 'acesstoken');
    clearCookie(res, 'userInfo');
    res.status(200).json({ message: 'Logout successful' });
  });
}

export default new AuthController();
