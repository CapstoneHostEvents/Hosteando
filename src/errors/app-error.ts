export default class AppError extends Error {
    message: string;
    statusCode: number
    constructor(message: any, statusCode: number) {
      super()
      this.message = message;
      this.statusCode = statusCode;
    }
  }
