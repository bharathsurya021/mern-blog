import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import errorMessages from '../constants/errormessages.js';
import generateToken from '../utils/generatetoken.js';

const authSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': errorMessages.nameRequired.message,
  }),
  email: Joi.string().email().required().messages({
    'string.email': errorMessages.emailInvalid.message,
    'any.required': errorMessages.emailRequired.message,
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('(?=.*[a-z])'))
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*\\d)'))
    .pattern(new RegExp('(?=.*[@$!%*?&])'))
    .required()
    .messages({
      'string.min': errorMessages.passwordMinLength.message,
      'string.pattern.base': [
        errorMessages.passwordUppercase.message,
        errorMessages.passwordLowercase.message,
        errorMessages.passwordNumber.message,
        errorMessages.passwordSpecial.message,
      ].join(', '),
      'any.required': errorMessages.passwordRequired.message,
    }),
});

class AuthService {
  async register(userData) {
    const { error } = authSchema.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const err = new Error(errorMessages.userExists.message);
      err.code = errorMessages.userExists.code;
      throw err;
    }

    const newUser = new User(userData)
    await newUser.save();
    return newUser;
  }

  async login({ email, password }) {
    // Check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error(errorMessages.invalidCredentials.message);
      err.code = errorMessages.invalidCredentials.code;
      throw err;
    }

    // Validate password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      const err = new Error(errorMessages.invalidCredentials.message);
      err.code = errorMessages.invalidCredentials.code;
      throw err;
    }

    //generate token
    const token = generateToken(user._id, email)
    return { token, user }
  }
}

export default new AuthService();
