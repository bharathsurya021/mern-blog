import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import errorMessages from '../constants/errormessages.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        res.status(401);
        throw {
          code: errorMessages.tokenInvalid.code,
          message: errorMessages.tokenInvalid.message,
          severity: errorMessages.tokenInvalid.severity,
        };
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw {
        code: errorMessages.tokenInvalid.code,
        message: errorMessages.tokenInvalid.message,
        severity: errorMessages.tokenInvalid.severity,
      };
    }
  }

  if (!token) {
    res.status(401);
    throw {
      code: errorMessages.noToken.code,
      message: errorMessages.noToken.message,
      severity: errorMessages.noToken.severity,
    };
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw {
      code: errorMessages.somethingWentWrong.code,
      message: errorMessages.somethingWentWrong.message,
      severity: errorMessages.somethingWentWrong.severity,
    };
  }
};

export { protect, admin };
