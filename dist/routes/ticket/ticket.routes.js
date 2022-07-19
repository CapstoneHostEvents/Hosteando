"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = __importDefault(require("../../controllers/ticket/ticket.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const ticketRouter = (0, express_1.Router)();
const ticketController = new ticket_controller_1.default();
ticketRouter.post("", auth_middleware_1.default, ticketController.store);
ticketRouter.get("", auth_middleware_1.default, ticketController.index);
exports.default = ticketRouter;
