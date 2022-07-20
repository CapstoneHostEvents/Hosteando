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
const globals_1 = require("@jest/globals");
const data_source_1 = require("../../data-source");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
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
    name: "test",
    description: "new event",
    date: "2025-07-07 17:01:18.410677",
};
const eventUpdated = {
    name: "EventUpdated",
    description: "new updated event",
    date: "2025-07-07 17:01:18.41067",
};
let tokenAdm = "";
let tokenAdm2 = "";
let tokenNoAdm = "";
let eventId = "";
let invalidId = "f465c681-991c-4da8-b663-24773dfe25da";
(0, globals_1.describe)("Create a Event", () => {
    let connection;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.log("Error during Data Source initialization: ", err);
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
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    // 1 - CREATE EVENT
    (0, globals_1.it)("Trying to create an event with correct body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/events")
            .send(eventCorrect)
            .set("Authorization", `Bearer ${tokenAdm}`);
        eventId = response.body.id;
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("name");
        (0, globals_1.expect)(response.body).toHaveProperty("description");
        (0, globals_1.expect)(response.body).toHaveProperty("date");
    }));
    (0, globals_1.it)("Trying to create an event with correct body without being an adm", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/events")
            .send(eventCorrect)
            .set("Authorization", `Bearer ${tokenNoAdm}`);
        (0, globals_1.expect)(response.status).toBe(403);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "User is not admin");
    }));
    (0, globals_1.it)("Trying to create an event with correct body with no token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/events")
            .send(eventCorrect);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "No token found");
    }));
    // 2 - LIST EVENTS
    (0, globals_1.it)("Trying to list all events", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/events")
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("map");
    }));
    // 3 - LIST ONE EVENT
    (0, globals_1.it)("Trying to list an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/events/${eventId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("name");
        (0, globals_1.expect)(response.body).toHaveProperty("description");
        (0, globals_1.expect)(response.body).toHaveProperty("date");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
        (0, globals_1.expect)(response.body).toHaveProperty("user");
    }));
    // 4 - UPDATE AN EVENT
    (0, globals_1.it)("Trying to update an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/events/${eventId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.body).toHaveProperty("name");
        (0, globals_1.expect)(response.body).toHaveProperty("description");
        (0, globals_1.expect)(response.body).toHaveProperty("date");
        (0, globals_1.expect)(response.body).toHaveProperty("created_at");
    }));
    (0, globals_1.it)("Trying to list an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/events/${invalidId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Event not found");
    }));
    // 4 - UPDATE AN EVENT
    (0, globals_1.it)("Trying to update an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/events/${eventId}`)
            .send(eventUpdated)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Event updated!");
    }));
    (0, globals_1.it)("Trying to update an event with different user from event creator", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/events/${eventId}`)
            .send(eventUpdated)
            .set("Authorization", `Bearer ${tokenAdm2}`);
        (0, globals_1.expect)(response.status).toBe(403);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "No permission allowed");
    }));
    (0, globals_1.it)("Trying to update an event that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/events/${invalidId}`)
            .send(eventCorrect)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Event not found");
    }));
    // 5 - DELETE AN EVENT
    (0, globals_1.it)("Trying to delete an event with different user from event creator", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/events/${eventId}`)
            .set("Authorization", `Bearer ${tokenAdm2}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "No permission allowed");
    }));
    (0, globals_1.it)("Trying to delete an event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/events/${eventId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Event deleted!");
    }));
    (0, globals_1.it)("Trying to delete an event that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/events/${eventId}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "Event not found");
    }));
});
