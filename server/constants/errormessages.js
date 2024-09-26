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
  noToken: { code: 'AUTH_013', message: 'No token', severity: 'ERROR' },

  // Post-related errors
  postRequired: { code: 'POST_001', message: 'Title and Description are required', severity: 'ERROR' },
  postNotFound: { code: 'POST_002', message: 'Post not found', severity: 'ERROR' },
  postCreationFailed: { code: 'POST_003', message: 'Failed to create post', severity: 'ERROR' },
  postUpdateFailed: { code: 'POST_004', message: 'Failed to update post', severity: 'ERROR' },
  postDeletionFailed: { code: 'POST_005', message: 'Failed to delete post', severity: 'ERROR' },
  authorNotFound: { code: 'POST_006', message: 'Author not found', severity: 'ERROR' },
  postFetchFailed: { code: 'POST_007', message: 'Failed to fetch post', severity: 'ERROR' },
  noPostsFound: { code: 'POST_008', message: 'No Posts Found', severity: 'ERROR' },

  invalidId: { code: 'MONGO_001', message: 'Invalid ObjectId', severity: 'ERROR' },
  invalidValue: { code: 'MONGO_002', message: 'Invalid value', severity: 'ERROR' },

  // General errors
  somethingWentWrong: { code: 'GEN_001', message: 'Something went wrong. Please try again later', severity: 'CRITICAL' },
};

export default errorMessages;
