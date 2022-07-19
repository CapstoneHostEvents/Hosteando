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
const Zone_1 = require("../../entities/Zone");
const Event_1 = require("../../entities/Event");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const createZoneService = ({ name, price, total_tickets, eventId, userId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
    const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
    const zones = yield zoneRepository.find();
    const event = yield eventRepository.findOneBy({
        id: eventId,
    });
    if (!event)
        throw new app_error_1.default("Event not found", 404);
    if (event.user.id !== userId)
        throw new app_error_1.default("No permission allowed", 403);
    if (zones.find((z) => z.name === name && z.event.id === eventId))
        throw new app_error_1.default("Name alrealdy used for that event", 400);
    const zone = zoneRepository.create({
        name,
        price,
        total_tickets,
    });
    zone.event = event;
    yield zoneRepository.save(zone);
    return zone;
});
exports.default = createZoneService;
