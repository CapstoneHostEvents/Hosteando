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
exports.ListEventService = void 0;
const data_source_1 = require("../../data-source");
const Event_1 = require("../../entities/Event");
const ListEventService = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
    const event = yield eventRepository.find();
    return event;
});
exports.ListEventService = ListEventService;
