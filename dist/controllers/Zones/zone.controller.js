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
const CreateZone_services_1 = __importDefault(require("../../services/Zones/CreateZone.services"));
const ListZone_services_1 = __importDefault(require("../../services/Zones/ListZone.services"));
const RetrieveEventZone_services_1 = __importDefault(require("../../services/Zones/RetrieveEventZone.services"));
const RetrieveZone_services_1 = __importDefault(require("../../services/Zones/RetrieveZone.services"));
class ZoneController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, total_tickets, eventId } = req.body;
            const createZoneService = new CreateZone_services_1.default();
            const zone = yield createZoneService.execute({
                name,
                price,
                total_tickets,
                eventId,
            });
            return res.status(201).json(zone);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listZoneService = new ListZone_services_1.default();
            const zones = yield listZoneService.execute();
            return res.status(200).json(zones);
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const retrieveZoneService = new RetrieveZone_services_1.default();
            const zoneId = req.params.zoneId;
            const zone = yield retrieveZoneService.execute(zoneId);
            return res.status(200).json(zone);
        });
    }
    indexEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const retrieveEventZoneService = new RetrieveEventZone_services_1.default();
            const eventId = req.params.eventId;
            const zones = yield retrieveEventZoneService.execute(eventId);
            return res.status(200).json(zones);
        });
    }
}
exports.default = ZoneController;
