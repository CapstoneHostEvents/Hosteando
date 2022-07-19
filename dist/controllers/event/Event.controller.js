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
exports.CreateEventController = void 0;
const createEvent_service_1 = require("../../services/event/createEvent.service");
const deleteEvent_service_1 = require("../../services/event/deleteEvent.service");
const listEvents_service_1 = require("../../services/event/listEvents.service");
const listOneEvent_service_1 = require("../../services/event/listOneEvent.service");
const updateEvent_service_1 = require("../../services/event/updateEvent.service");
class CreateEventController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date } = req.newEvent;
            const user = req.user.id;
            const newEvent = yield (0, createEvent_service_1.CreateEventService)({ name, description, date, user });
            return res.status(201).json(newEvent);
        });
    }
    static read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield (0, listEvents_service_1.ListEventService)();
            return res.status(200).json(events);
        });
    }
    static readOneEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const event = yield (0, listOneEvent_service_1.ListOneEventService)(id);
            return res.status(200).json(event);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date } = req.body;
            const id = req.params.id;
            const user = req.user.id;
            const newEvent = yield (0, updateEvent_service_1.UpdateEventService)({ name, description, date, id, user });
            return res.status(200).json(newEvent);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user.id;
            yield (0, deleteEvent_service_1.DeleteEventService)(id, user);
            return res.status(200).json({ message: "Event deleted!" });
        });
    }
}
exports.CreateEventController = CreateEventController;
