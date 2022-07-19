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
exports.UpdateEventService = void 0;
const data_source_1 = require("../../data-source");
const Event_1 = require("../../entities/Event");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const UpdateEventService = ({ name, description, date, id, user }) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`userId ${user}`)
    // console.log(`EventId ${id}`)
    if (id.length !== 36) {
        throw new app_error_1.default("Wrong event id", 404);
    }
    const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
    const event = yield eventRepository.findOneBy({
        id: id
    });
    console.log(event);
    if (!event) {
        throw new app_error_1.default("Event not found", 404);
    }
    // console.log(`event: ${event.user.id}`)
    if ((event === null || event === void 0 ? void 0 : event.user.id) !== user) {
        throw new app_error_1.default("No permission allowed", 403);
    }
    name ? (event.name = name) : event.name;
    description ? (event.description = description) : event.description;
    date ? (event.date = date) : event.date;
    yield eventRepository.save(event);
    return event;
});
exports.UpdateEventService = UpdateEventService;
