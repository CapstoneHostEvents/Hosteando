"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const express_error_middleware_1 = require("./middlewares/express-error.middleware");
const event_routes_1 = require("./routes/event.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_error_middleware_1.errorHandler);
app.use('/event', event_routes_1.EventRoutes);
exports.default = app;
