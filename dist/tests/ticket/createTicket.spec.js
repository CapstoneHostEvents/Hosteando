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
(0, globals_1.describe)("Create ticket", () => {
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
    (0, globals_1.test)("Should be able to create an ticket", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("userId");
        (0, globals_1.expect)(response.body).toHaveProperty("zoneId");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
    }));
    (0, globals_1.test)("Should be able to create various tickets from different users", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        let response;
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("userId");
        (0, globals_1.expect)(response.body).toHaveProperty("zoneId");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("userId");
        (0, globals_1.expect)(response.body).toHaveProperty("zoneId");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("userId");
        (0, globals_1.expect)(response.body).toHaveProperty("zoneId");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
    }));
    (0, globals_1.test)("Don't allow creating more tickets than the zone total", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(409);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("All tickets from this zone were already created");
    }));
    (0, globals_1.test)("Send an error message if user was not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: zoneData.id,
            zoneId: zoneData.id,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("User not found");
    }));
    (0, globals_1.test)("Send an error message if zone was not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: userData.id,
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Zone not found");
    }));
});
