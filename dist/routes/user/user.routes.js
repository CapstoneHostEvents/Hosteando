"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../../controllers/user/userControllers"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const isAdmUser_middleware_1 = __importDefault(require("../../middlewares/isAdmUser.middleware"));
const schemaValidationUser_middleware_1 = require("../../middlewares/schemaValidationUser.middleware");
const userRouter = (0, express_1.Router)();
const userController = new userControllers_1.default();
userRouter.post("", (0, schemaValidationUser_middleware_1.validateUserCreate)(schemaValidationUser_middleware_1.handleUserError), userController.store);
userRouter.get("", auth_middleware_1.default, isAdmUser_middleware_1.default, userController.index);
userRouter.get("/:id", userController.show);
userRouter.patch("/:id", auth_middleware_1.default, userController.update);
userRouter.delete("/:id", auth_middleware_1.default, userController.delete);
exports.default = userRouter;
