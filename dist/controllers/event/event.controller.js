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
const createEvent_service_1 = __importDefault(require("../../services/event/createEvent.service"));
const deleteEvent_service_1 = __importDefault(require("../../services/event/deleteEvent.service"));
const listEvents_service_1 = __importDefault(require("../../services/event/listEvents.service"));
const listOneEvent_service_1 = __importDefault(require("../../services/event/listOneEvent.service"));
const updateEvent_service_1 = __importDefault(require("../../services/event/updateEvent.service"));
class EventController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date } = req.newEvent;
            const user = req.user.id;
            const newEvent = yield (0, createEvent_service_1.default)({
                name,
                description,
                date,
                user,
            });
            return res.status(201).json(newEvent);
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield (0, listEvents_service_1.default)();
            return res.status(200).json(events);
        });
    }
    readOneEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const event = yield (0, listOneEvent_service_1.default)(id);
            return res.status(200).json(event);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date } = req.body;
            const id = req.params.id;
            const user = req.user.id;
            yield (0, updateEvent_service_1.default)({
                name,
                description,
                date,
                id,
                user,
            });
            return res.status(200).json({ message: "Event updated!" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user.id;
            yield (0, deleteEvent_service_1.default)(id, user);
            return res.status(200).json({ message: "Event deleted!" });
        });
    }
}
exports.default = EventController;
