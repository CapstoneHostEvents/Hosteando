"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../../controllers/event/event.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const isAdmUser_middleware_1 = __importDefault(require("../../middlewares/isAdmUser.middleware"));
const schemaValidationEvent_middleware_1 = require("../../middlewares/schemaValidationEvent.middleware");
const eventRoutes = (0, express_1.Router)();
const eventController = new event_controller_1.default();
eventRoutes.post("/", auth_middleware_1.default, isAdmUser_middleware_1.default, (0, schemaValidationEvent_middleware_1.validateEventCreate)(schemaValidationEvent_middleware_1.handleEventError), eventController.create);
eventRoutes.get("/", eventController.read);
eventRoutes.get("/:id", auth_middleware_1.default, isAdmUser_middleware_1.default, eventController.readOneEvent);
eventRoutes.patch("/:id", auth_middleware_1.default, isAdmUser_middleware_1.default, eventController.update);
eventRoutes.delete("/:id", auth_middleware_1.default, isAdmUser_middleware_1.default, eventController.delete);
exports.default = eventRoutes;
