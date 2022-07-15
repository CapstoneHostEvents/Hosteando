"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const Event_controller_1 = require("../controllers/event/Event.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const schemaValidationEvent_middleware_1 = require("../middlewares/schemaValidationEvent.middleware");
exports.EventRoutes = (0, express_1.Router)();
exports.EventRoutes.post("/", auth_middleware_1.default, (0, schemaValidationEvent_middleware_1.validateEventCreate)(schemaValidationEvent_middleware_1.handleEventError), Event_controller_1.CreateEventController.create);
exports.EventRoutes.get("/", Event_controller_1.CreateEventController.read);
