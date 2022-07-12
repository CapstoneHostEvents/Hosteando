class AppError {
    message: string;
    statusCode: number
    constructor(message: any, statusCode: number) {
      this.message = message;
      this.statusCode = statusCode;
    }
  }
  
export default AppError;