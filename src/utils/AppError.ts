export default class AppError extends Error {
  statusCode;
  status;
  isOpertional;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOpertional = false;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
