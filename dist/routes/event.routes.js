"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const Event_controller_1 = require("../controllers/Event.controller");
const schemaValidationEvent_middleware_1 = require("../middlewares/schemaValidationEvent.middleware");
exports.EventRoutes = (0, express_1.Router)();
exports.EventRoutes.post("/", (0, schemaValidationEvent_middleware_1.validateEventCreate)(schemaValidationEvent_middleware_1.handleEventError), Event_controller_1.CreateEventController.create);
exports.EventRoutes.get("/", Event_controller_1.CreateEventController.read);
