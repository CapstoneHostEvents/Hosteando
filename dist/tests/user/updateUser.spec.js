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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("Test for PATCH method at /users/:id", () => {
    let connection;
    let testUser = {
        name: "miguel",
        email: "testemiguel@hotmail.com",
        password: "123456Ab!",
        isAdm: true,
    };
    let testUser1 = {
        name: "Maria",
        email: "maria@kenzie.com",
        password: "123456Ab!",
    };
    let loginUser = {
        email: "testemiguel@hotmail.com",
        password: "123456Ab!",
    };
    let response1;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        response1 = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser);
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    (0, globals_1.test)("Trying to update an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginUser);
        const { token } = responseToken.body;
        const responsePatch = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/${response1.body.id}`)
            .send(testUser1)
            .set("Authorization", `Bearer ${token}`);
        const responseGet = yield (0, supertest_1.default)(app_1.default).get(`/users/${response1.body.id}`);
        (0, globals_1.expect)(responsePatch.status).toEqual(200);
        (0, globals_1.expect)(responsePatch.body).toHaveProperty("message");
        (0, globals_1.expect)(responseGet.body).toEqual(globals_1.expect.objectContaining({
            id: responseGet.body.id,
            name: testUser1.name,
            email: testUser1.email,
            created_at: responseGet.body.created_at,
            updated_at: responseGet.body.updated_at,
        }));
    }));
    (0, globals_1.test)("Trying to update an user that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/users/1`);
        (0, globals_1.expect)(response.status).toEqual(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
    }));
});
