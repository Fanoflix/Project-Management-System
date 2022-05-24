class ApiError extends Error {
  constructor(statusCode, errorMessage, isOperational = true, stack = "") {
    super(errorMessage); // calls parent constructor
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.isOperational = isOperational; // operational errors are errors that are natual and expected to appear in the application

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
