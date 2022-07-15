"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("../errors/app-error"));
const isAdmUserMiddleware = (req, res, next) => {
    if (!req.user.isAdm) {
        throw new app_error_1.default("User is not admin", 403);
    }
    next();
};
exports.default = isAdmUserMiddleware;
