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
const Tickets_1 = require("../../entities/Tickets");
const Zone_1 = require("../../entities/Zone");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const ticketDeleteService = (id, userId_fromToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = data_source_1.AppDataSource.getRepository(Tickets_1.Ticket);
    const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
    const [ticket] = yield ticketRepository
        .createQueryBuilder()
        .select(["Ticket.id, Ticket.user, Ticket.zone"])
        .where("Ticket.id = :ticket_id", { ticket_id: id })
        .getRawMany();
    if (!ticket) {
        throw new app_error_1.default("Ticket not found", 404);
    }
    const zone = yield zoneRepository
        .findOneBy({ id: ticket.zoneId });
    if ((zone === null || zone === void 0 ? void 0 : zone.event.user.id) != userId_fromToken && ticket.userId != userId_fromToken) {
        throw new app_error_1.default("Only the owner of ticket or owner of event can delete it", 403);
    }
    yield ticketRepository.delete(ticket.id);
});
exports.default = ticketDeleteService;
