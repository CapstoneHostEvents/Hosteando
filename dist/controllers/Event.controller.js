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
const createEvent_service_1 = require("../services/createEvent.service");
const listEvents_service_1 = require("../services/listEvents.service");
class CreateEventController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date } = req.newEvent;
            const newEvent = yield (0, createEvent_service_1.CreateEventService)({ name, description, date });
            return res.status(201).json(newEvent);
        });
    }
    static read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield (0, listEvents_service_1.ListEventService)();
            return res.status(200).json(events);
        });
    }
}
exports.CreateEventController = CreateEventController;
