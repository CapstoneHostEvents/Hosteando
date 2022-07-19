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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const globals_1 = require("@jest/globals");
const data_source_1 = require("../../data-source");
const mockUserAdm = {
    name: "daniel",
    email: "daniel@kenzie.com",
    password: "1234",
    isAdm: true,
};
const loginAdm = {
    email: "daniel@kenzie.com",
    password: "1234",
};
const mockUserAdm2 = {
    name: "daniel",
    email: "daniel2@kenzie.com",
    password: "1234",
    isAdm: true,
};
const loginAdm2 = {
    email: "daniel2@kenzie.com",
    password: "1234",
};
const mockUserNoAdm = {
    name: "ugo",
    email: "ugo@kenzie.com",
    password: "1234",
    isAdm: false,
};
const loginNoAdm = {
    email: "ugo@kenzie.com",
    password: "1234",
};
const eventCorrect = {
    name: "Event1caio",
    description: "new event",
    date: "2025-07-07 17:01:18.410677",
};
const zoneCorret = {
    name: "lounge VIP",
    price: 3000,
    total_tickets: 200,
    eventId: "",
};
const zoneUpdate = {
    name: "novo lounge",
    price: 300,
    total_tickets: 50,
};
let tokenAdm = "";
let tokenAdm2 = "";
let tokenNoAdm = "";
let zoneId = "";
(0, globals_1.describe)("Testes rota /zones", () => {
    let connection;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        const signupAdmResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(mockUserAdm);
        const loginAdmResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginAdm);
        tokenAdm = loginAdmResponse.body.token;
        const signupAdmResponse2 = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(mockUserAdm2);
        const loginAdmResponse2 = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginAdm2);
        tokenAdm2 = loginAdmResponse2.body.token;
        const signupNoAdmResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(mockUserNoAdm);
        const loginNoAdmResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(loginNoAdm);
        tokenNoAdm = loginNoAdmResponse.body.token;
        const createEvent = yield (0, supertest_1.default)(app_1.default)
            .post("/event")
            .send(eventCorrect)
            .set("Authorization", `Bearer ${tokenAdm}`);
        zoneCorret.eventId = createEvent.body.id;
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    (0, globals_1.it)("Trying to create a zone with correct body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/zones")
            .send(zoneCorret)
            .set("Authorization", `Bearer ${tokenAdm}`);
        zoneId = response.body.id;
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("name");
        (0, globals_1.expect)(response.body).toHaveProperty("price");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
        (0, globals_1.expect)(response.body).toHaveProperty("event");
    }));
    (0, globals_1.it)("Trying to create a zone with different user from event creator", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/zones")
            .send(zoneCorret)
            .set("Authorization", `Bearer ${tokenAdm2}`);
        (0, globals_1.expect)(response.status).toBe(403);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "No permission allowed");
    }));
    (0, globals_1.it)("Trying to create a zone with correct body withouy being an adm", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/zones")
            .send(zoneCorret)
            .set("Authorization", `Bearer ${tokenNoAdm}`);
        (0, globals_1.expect)(response.status).toBe(403);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "User is not admin");
    }));
    (0, globals_1.it)("Trying to create a zone with correct body with no token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/zones").send(zoneCorret);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "No token found");
    }));
    (0, globals_1.it)("Trying to list all zones", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/zones")
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("map");
    }));
    (0, globals_1.it)("Trying to list a zone", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/zones/${zoneId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("name");
        (0, globals_1.expect)(response.body).toHaveProperty("price");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
        (0, globals_1.expect)(response.body).toHaveProperty("event");
    }));
    (0, globals_1.it)("Trying to update a zone", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/zones/${zoneId}`)
            .send(zoneUpdate)
            .set("Authorization", `Bearer ${tokenAdm}`);
        const responseGet = yield (0, supertest_1.default)(app_1.default)
            .get(`/zones/${zoneId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Zone updated!");
        (0, globals_1.expect)(responseGet.body).toHaveProperty("name", zoneUpdate.name);
        (0, globals_1.expect)(responseGet.body).toHaveProperty("price", zoneUpdate.price);
        (0, globals_1.expect)(responseGet.body).toHaveProperty("total_tickets", zoneUpdate.total_tickets);
    }));
    (0, globals_1.it)("Trying to update a zone with eventId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/zones/${zoneId}`)
            .send(Object.assign(Object.assign({}, zoneUpdate), { eventId: "teste" }))
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Cannot change eventId for a zone");
    }));
    (0, globals_1.it)("Trying to delete a zone", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/zones/${zoneId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        const responseGet = yield (0, supertest_1.default)(app_1.default)
            .get(`/zones/${zoneId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Zone deleted!");
        (0, globals_1.expect)(responseGet.body).toHaveProperty("status", "error");
    }));
});
