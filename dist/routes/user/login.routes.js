"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../../controllers/user/userControllers"));
const schemaValidationLogin_middleware_1 = require("../../middlewares/schemaValidationLogin.middleware");
const loginRouter = (0, express_1.Router)();
const userController = new userControllers_1.default();
loginRouter.post("", (0, schemaValidationLogin_middleware_1.validateLoginCreate)(schemaValidationLogin_middleware_1.handleLoginError), userController.login);
exports.default = loginRouter;
