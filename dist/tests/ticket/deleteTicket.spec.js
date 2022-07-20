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
    let ticketData;
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
            total_tickets: 5,
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
    (0, globals_1.test)("Should be able to delete an ticket", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        let response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${response.body.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Ticket deleted");
    }));
    (0, globals_1.test)("Should be able to delete multiple tickets from multiples users", () => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        const ticketData1 = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(ticketData1.status).toBe(201);
        const ticketData2 = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(ticketData2.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${ticketData1.body.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Ticket deleted");
        response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${ticketData2.body.id}`)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Ticket deleted");
    }));
    (0, globals_1.test)("Should be able to create more tickets after deleting some", () => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        const ticket = {
            userId: userData.id,
            zoneId: zoneData.id,
        };
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket)
            .set("Authorization", `Bearer ${token1}`);
        ticketData = response.body;
        (0, globals_1.expect)(response.status).toBe(201);
    }));
    (0, globals_1.test)("Owner of events should be able to delete tickets from others users", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        let response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${response.body.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Ticket deleted");
    }));
    (0, globals_1.test)("Send an error message if token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const ticket2 = {
            userId: userData2.id,
            zoneId: zoneData.id,
        };
        let response = yield (0, supertest_1.default)(app_1.default)
            .post("/tickets")
            .send(ticket2)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(201);
        response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${response.body.id}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
    }));
    (0, globals_1.test)("Send an error message if ticket wasn't found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${userData.id}`)
            .set("Authorization", `Bearer ${token1}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Ticket not found");
    }));
    (0, globals_1.test)("Send an error message if another user who didn't create the event or created the ticket tries to delete the ticket", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/tickets/${ticketData.id}`)
            .set("Authorization", `Bearer ${token2}`);
        (0, globals_1.expect)(response.status).toBe(403);
        (0, globals_1.expect)(response.body.status).toBe("error");
        (0, globals_1.expect)(response.body).toHaveProperty("message");
        (0, globals_1.expect)(response.body.message).toBe("Only the owner of ticket or owner of event can delete it");
    }));
});
