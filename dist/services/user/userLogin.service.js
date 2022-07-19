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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const app_error_1 = __importDefault(require("../../errors/app-error"));
require("dotenv/config");
const userLoginService = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    //retorna o token string
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepository.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        throw new app_error_1.default("Wrong email/password", 403);
    }
    const comparePassword = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!comparePassword) {
        throw new app_error_1.default("Wrong email/password", 403);
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        adm: user.isAdm,
    }, process.env.SECRET_KEY, //preciso desse alias pq caso contrário gera error.
    {
        expiresIn: "24h",
    });
    return token;
});
exports.default = userLoginService;
