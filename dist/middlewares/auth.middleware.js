"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const app_error_1 = __importDefault(require("../errors/app-error"));
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new app_error_1.default("No token found", 404);
    }
    const splitToken = token.split(" ");
    jsonwebtoken_1.default.verify(splitToken[1], process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            throw new app_error_1.default("Invalid token", 401);
        }
        req.user = {
            id: decoded.id,
            isAdm: decoded.adm,
        };
        next();
    });
};
exports.default = authMiddleware;
