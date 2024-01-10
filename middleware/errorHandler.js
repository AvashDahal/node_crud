const { errorConstants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode || 500; // Set default status code to 500

  switch (err?.code) {
    case errorConstants.VALIDATION_ERROR:
      statusCode = 400; // Bad Request
      break;

    case errorConstants.NOT_FOUND:
      statusCode = 404; // Not Found
      break;

    case errorConstants.UNAUTHORIZED:
      statusCode = 401; // Unauthorized
      break;

    case errorConstants.FORBIDDEN:
      statusCode = 403; // Forbidden
      break;

    case errorConstants.SERVER_ERROR:
      statusCode = 500; // Internal Server Error
      break;

    default:
      statusCode = 500; // Default to Internal Server Error
      break;
  }

  res.status(statusCode).json({ title: "Error", message: err.message, stackTrace: err.stack });
};

module.exports = errorHandler;
