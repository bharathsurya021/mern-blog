const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  const errorResponse = {
    code: err.code || 'GEN_001',
    message: err.message || 'Something went wrong. Please try again later',
    severity: err.severity || 'CRITICAL',
  };
  res.status(statusCode)
  res.json({
    ...errorResponse,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }