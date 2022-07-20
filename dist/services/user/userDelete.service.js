"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const User_1 = require("../../entities/User");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const userDeleteService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const users = yield userRepository.find();
    const userDel = users.find((userId) => userId.id === id);
    if (!userDel) {
        throw new app_error_1.default("User not found!", 404);
    }
    if (user !== id) {
        throw new app_error_1.default("Has to be the same user", 403);
    }
    yield userRepository.delete(id);
});
exports.default = userDeleteService;
