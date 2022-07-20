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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Tickets_1 = require("../../entities/Tickets");
const ticketListIndexService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = data_source_1.AppDataSource.getRepository(Tickets_1.Ticket);
    const ticketList = yield ticketRepository
        .createQueryBuilder()
        .select(["Ticket.id, Ticket.user.id, Ticket.zone.id, Ticket.created_at"])
        .where("Ticket.userId = :user_id", { user_id: id })
        .getRawMany();
    return ticketList;
});
exports.default = ticketListIndexService;
