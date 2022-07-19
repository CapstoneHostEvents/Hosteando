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
const zoneCreate_services_1 = __importDefault(require("../../services/zone/zoneCreate.services"));
const zoneDelete_service_1 = __importDefault(require("../../services/zone/zoneDelete.service"));
const zoneList_services_1 = __importDefault(require("../../services/zone/zoneList.services"));
const zoneListIndex_services_1 = __importDefault(require("../../services/zone/zoneListIndex.services"));
const zoneUpdate_service_1 = __importDefault(require("../../services/zone/zoneUpdate.service"));
class ZoneController {
    //Criando Zone
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, total_tickets, eventId } = req.body;
            const userId = req.user.id;
            const zone = yield (0, zoneCreate_services_1.default)({
                name,
                price,
                total_tickets,
                eventId,
                userId,
            });
            return res.status(201).json(zone);
        });
    }
    //Listando todos as Zones
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zones = yield (0, zoneList_services_1.default)();
            return res.status(200).json(zones);
        });
    }
    //Listar Zone por Id
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneId = req.params.zoneId;
            const zone = yield (0, zoneListIndex_services_1.default)(zoneId);
            return res.status(200).json(zone);
        });
    }
    //Atualizar Zone por id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneId = req.params.zoneId;
            const { name, price, total_tickets, eventId } = req.body;
            const updateZone = yield (0, zoneUpdate_service_1.default)({
                name,
                price,
                total_tickets,
                eventId,
                zoneId,
            });
            return res.status(200).json({ message: "Zone updated!" });
        });
    }
    //Deletando User
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneId = req.params.zoneId;
            const deleteUser = yield (0, zoneDelete_service_1.default)(zoneId);
            return res.status(200).json({ message: "Zone deleted!" });
        });
    }
}
exports.default = ZoneController;
