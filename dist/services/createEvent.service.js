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
exports.CreateEventService = void 0;
const event_entity_1 = require("../entities/event.entity");
const data_source_1 = require("../data-source");
const app_error_1 = __importDefault(require("../errors/app-error"));
const CreateEventService = ({ name, description, date }) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = data_source_1.AppDataSource.getRepository(event_entity_1.Event);
    const findEvent = yield eventRepository.findOne({
        where: {
            name: name
        }
    });
    if (findEvent) {
        throw new app_error_1.default("This event already exists", 400);
    }
    const event = yield eventRepository.create({
        name,
        description,
        date,
    });
    yield eventRepository.save(event);
    return event;
});
exports.CreateEventService = CreateEventService;
