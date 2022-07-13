export default class AppError extends Error {
    message: string;
    statusCode: number
    constructor(message: any, statusCode: number = 400) {
      super()
      this.message = message;
      this.statusCode = statusCode;
    }
  }
