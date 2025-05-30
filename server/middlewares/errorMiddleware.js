export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.statusCode(err.statusCode).json({
    staus: err.status,
    message: err.message,
  });
};

