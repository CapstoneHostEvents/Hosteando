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
const globals_1 = require("@jest/globals");
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
(0, globals_1.describe)("Testing GET /users", () => {
    let connection;
    let testUser = {
        name: "miguel",
        email: "testemiguel@hotmail.com",
        password: "123456Ab!",
        isAdm: true,
    };
    let loginUser = {
        email: "testemiguel@hotmail.com",
        password: "123456Ab!",
    };
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser);
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    (0, globals_1.test)("Should be able to list all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginUser);
        const { token } = responseToken.body;
        const response = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${token}`);
        delete testUser.password; //password deletada porque a requisição dos usuarios não contem password 
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body.length).toEqual(1);
        (0, globals_1.expect)(Array.isArray(response.body)).toBe(true);
        (0, globals_1.expect)(response.body).toEqual(globals_1.expect.arrayContaining([
            globals_1.expect.objectContaining(Object.assign(Object.assign({}, testUser), { id: response.body[0].id, created_at: response.body[0].created_at, updated_at: response.body[0].updated_at })),
        ]));
    }));
});
