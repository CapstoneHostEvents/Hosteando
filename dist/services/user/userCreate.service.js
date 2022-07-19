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
const User_1 = require("../../entities/User");
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../../data-source");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const userCreateService = ({ isAdm, email, name, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(password);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const checkUserExists = yield userRepository.findOne({
        where: {
            email,
        },
    });
    if (checkUserExists) {
        throw new app_error_1.default("This email already exists", 400);
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const user = userRepository.create({
        isAdm,
        name,
        email,
        password: hashedPassword,
    });
    yield userRepository.save(user);
    return user;
});
exports.default = userCreateService;
