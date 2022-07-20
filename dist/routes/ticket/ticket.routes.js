"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = __importDefault(require("../../controllers/ticket/ticket.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const schemaValidationTicket_middleware_1 = require("../../middlewares/schemaValidationTicket.middleware");
const ticketRouter = (0, express_1.Router)();
const ticketController = new ticket_controller_1.default();
ticketRouter.post("", (0, schemaValidationTicket_middleware_1.validateTicketCreate)(schemaValidationTicket_middleware_1.handleTicketError), auth_middleware_1.default, ticketController.store);
ticketRouter.get("", auth_middleware_1.default, ticketController.index);
ticketRouter.get("/:id", auth_middleware_1.default, ticketController.show);
ticketRouter.delete("/:id", auth_middleware_1.default, ticketController.delete);
exports.default = ticketRouter;
