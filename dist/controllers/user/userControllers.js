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
const userCreate_service_1 = __importDefault(require("../../services/user/userCreate.service"));
const userDelete_service_1 = __importDefault(require("../../services/user/userDelete.service"));
const userList_service_1 = __importDefault(require("../../services/user/userList.service"));
const userListIndex_service_1 = __importDefault(require("../../services/user/userListIndex.service"));
const userLogin_service_1 = __importDefault(require("../../services/user/userLogin.service"));
const userSendEmail_service_1 = __importDefault(require("../../services/user/userSendEmail.service"));
const userUpdate_service_1 = __importDefault(require("../../services/user/userUpdate.service"));
class UserController {
    //Criando User
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { isAdm, name, email, password } = req.newUser;
            const createUser = yield (0, userCreate_service_1.default)({
                isAdm,
                name,
                email,
                password,
            });
            return res.status(201).json(createUser);
        });
    }
    //Listando todos os usuários
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, userList_service_1.default)();
            return res.status(200).json(users);
        });
    }
    //Listar User por Id
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const listbyId = yield (0, userListIndex_service_1.default)(id);
            return res.status(200).json(listbyId);
        });
    }
    //Atualizar User
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.user.id;
            const { isAdm, name, email, password } = req.body;
            const updateUser = yield (0, userUpdate_service_1.default)({
                isAdm,
                name,
                email,
                password,
                id,
                user
            });
            return res.status(200).json({ message: "User updated!" });
        });
    }
    //Deletando User
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.user.id;
            const deleteUser = yield (0, userDelete_service_1.default)(id, user);
            return res.status(200).json({ message: "User deleted!" });
        });
    }
    //Login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.newLogin;
            const token = yield (0, userLogin_service_1.default)({ email, password });
            return res.status(201).json({ token });
        });
    }
    //Email
    sendemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subject, to, text } = req.body;
            const emailuser = yield (0, userSendEmail_service_1.default)({ subject, to, text });
            return res.status(200).json({ message: "Email succeed" });
        });
    }
}
exports.default = UserController;
