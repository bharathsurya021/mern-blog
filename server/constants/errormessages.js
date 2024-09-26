const errorMessages = {
  // Auth-related errors
  emailInvalid: { code: 'AUTH_001', message: 'Invalid email format', severity: 'ERROR' },
  emailRequired: { code: 'AUTH_002', message: 'Email is required', severity: 'ERROR' },
  nameRequired: { code: 'AUTH_003', message: 'Name is required', severity: 'ERROR' },
  userExists: { code: 'AUTH_004', message: 'User already exists', severity: 'WARNING' },

  // Password-related errors
  passwordMinLength: { code: 'AUTH_005', message: 'Password must be at least 8 characters long', severity: 'ERROR' },
  passwordUppercase: { code: 'AUTH_006', message: 'Password must contain at least one uppercase letter', severity: 'ERROR' },
  passwordLowercase: { code: 'AUTH_007', message: 'Password must contain at least one lowercase letter', severity: 'ERROR' },
  passwordNumber: { code: 'AUTH_008', message: 'Password must contain at least one number', severity: 'ERROR' },
  passwordSpecial: { code: 'AUTH_009', message: 'Password must contain at least one special character', severity: 'ERROR' },
  passwordRequired: { code: 'AUTH_010', message: 'Password is required', severity: 'ERROR' },

  // Login-related errors
  invalidCredentials: { code: 'AUTH_011', message: 'Invalid email or password', severity: 'ERROR' },
  tokenInvalid: { code: 'AUTH_012', message: 'Invalid token', severity: 'ERROR' },

  // General errors
  somethingWentWrong: { code: 'GEN_001', message: 'Something went wrong. Please try again later', severity: 'CRITICAL' },
};

export default errorMessages;
