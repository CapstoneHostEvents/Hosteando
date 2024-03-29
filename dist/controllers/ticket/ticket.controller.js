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
const ticketCreate_service_1 = __importDefault(require("../../services/ticket/ticketCreate.service"));
const ticketList_service_1 = __importDefault(require("../../services/ticket/ticketList.service"));
const ticketListIndex_service_1 = __importDefault(require("../../services/ticket/ticketListIndex.service"));
const ticketDelete_service_1 = __importDefault(require("../../services/ticket/ticketDelete.service"));
class TicketController {
    // Create ticket
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, zoneId } = req.body;
            const newTicket = yield (0, ticketCreate_service_1.default)({ userId, zoneId });
            return res.status(201).json(newTicket);
        });
    }
    //List all tickets
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketList = yield (0, ticketList_service_1.default)();
            return res.status(200).json(ticketList);
        });
    }
    //List all tickets from Id 
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticketList = yield (0, ticketListIndex_service_1.default)(id);
            return res.status(200).json(ticketList);
        });
    }
    //Delete ticket
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId_fromToken = req.user.id;
            const { id } = req.params;
            yield (0, ticketDelete_service_1.default)(id, userId_fromToken);
            return res.status(200).json({ message: "Ticket deleted" });
        });
    }
}
exports.default = TicketController;
