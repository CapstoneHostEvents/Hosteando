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
const User_1 = require("../../entities/User");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const ticketCreateService = ({ userId, zoneId }) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketRepository = data_source_1.AppDataSource.getRepository(Tickets_1.Ticket);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
    const user = yield userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new app_error_1.default("User not found", 400);
    }
    const zone = yield zoneRepository.findOneBy({ id: zoneId });
    if (!zone) {
        throw new app_error_1.default("Zone not found", 400);
    }
    const tickets = yield ticketRepository
        .createQueryBuilder()
        .select('t.created_at')
        .from(Tickets_1.Ticket, 't')
        .where("t.zoneId = :zone_id", { zone_id: zoneId })
        .getMany();
    if (tickets.length + 1 > zone.total_tickets) {
        throw new app_error_1.default("All tickets from this zone were already created", 409);
    }
    let newTicket = new Tickets_1.Ticket();
    newTicket.user = user;
    newTicket.zone = zone;
    newTicket = ticketRepository.create(newTicket);
    yield ticketRepository.save(newTicket);
    return {
        id: newTicket.id,
        userId: newTicket.user.id,
        zoneId: newTicket.zone.id,
        created_at: newTicket.created_at
    };
});
exports.default = ticketCreateService;
