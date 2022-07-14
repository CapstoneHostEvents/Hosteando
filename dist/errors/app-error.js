"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = AppError;
