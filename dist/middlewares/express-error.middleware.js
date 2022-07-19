"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_1 = __importDefault(require("../errors/app-error"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof app_error_1.default) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.log(err);
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
