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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
(0, globals_1.describe)("List tickets from user", () => {
    let connection;
    let userData;
    let userData2;
    let token1;
    let token2;
    let zoneData;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Data Source initialization failed", err);
        });
        const user = {
            name: "paulo",
            email: "paulo@gmail.com",
            password: "1234",
            isAdm: true,
        };
        const user2 = {
            name: "david",
            email: "david@gmail.com",
            password: "1234",
            isAdm: false,
        };
        userData = yield (yield (0, supertest_1.default)(app_1.default).post("/users").send(user)).body;
        userData2 = yield (yield (0, supertest_1.default)(app_1.default).post("/users").send(user2)).body;
        token1 = yield (yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: user.email, password: user.password })).body.token;
        token2 = yield (yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: user2.email, password: user2.password })).body.token;
        const event = {
            name: "Rock in Rio",
            description: "Show of rock at Rio",
            date: userData.created_at,
        };
        const eventData = yield (yield (0, supertest_1.default)(app_1.default)
            .post("/events")
            .send(event)
            .set("Authorization", `Bearer ${token1}`)).body;
        const zone = {
            name: "camarote",
            price: 200,
            total_tickets: 4,
            userId: userData.id,
            eventId: eventData.id,
        };
        zoneData = yield (yield (0, supertest_1.default)(app_1.default)
            .post("/zones")
            .send(zone)
            .set("Authorization", `Bearer ${token1}`)).body;
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    (0, globals_1.test)("Should list an empty array if user has no ticket", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.default)
            .get(`/tickets/${userData.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body.length).toEqual(0);
        (0, globals_1.expect)(Array.isArray(response.body)).toBe(true);
    }));
    (0, globals_1.test)("Should be able to list one ticket correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        let response;
        yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        response = yield (0, supertest_1.default)(app_1.default)
            .get(`/tickets/${userData.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body.length).toEqual(1);
        (0, globals_1.expect)(Array.isArray(response.body)).toBe(true);
        (0, globals_1.expect)(response.body).toEqual(globals_1.expect.arrayContaining([
            globals_1.expect.objectContaining(Object.assign(Object.assign({}, ticket), { id: response.body[0].id, created_at: response.body[0].created_at })),
        ]));
    }));
    (0, globals_1.test)("Should be able to list all tickets from user correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        let response;
        yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        response = yield (0, supertest_1.default)(app_1.default)
            .get(`/tickets/${userData2.id}`)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toEqual(200);
        (0, globals_1.expect)(response.body.length).toEqual(2);
        (0, globals_1.expect)(Array.isArray(response.body)).toBe(true);
        (0, globals_1.expect)(response.body).toEqual(globals_1.expect.arrayContaining([
            globals_1.expect.objectContaining(Object.assign(Object.assign({}, ticket2), { id: response.body[0].id, created_at: response.body[0].created_at })),
            globals_1.expect.objectContaining(Object.assign(Object.assign({}, ticket2), { id: response.body[1].id, created_at: response.body[1].created_at })),
        ]));
    }));
});
