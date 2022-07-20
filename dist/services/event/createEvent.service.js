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
const Event_1 = require("../../entities/Event");
const User_1 = require("../../entities/User");
const data_source_1 = require("../../data-source");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const createEventService = ({ name, description, date, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
    const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    const findEvent = yield eventRepository.findOne({
        where: { name },
    });
    const userData = yield userRepository.findOneBy({
        id: user,
    });
    if ((userData === null || userData === void 0 ? void 0 : userData.id) !== user) {
        throw new app_error_1.default("No permission allowed", 403);
    }
    if (findEvent) {
        throw new app_error_1.default("This event already exists", 403);
    }
    const event = yield eventRepository.create({
        name,
        description,
        date,
        user: user,
    });
    yield eventRepository.save(event);
    return event;
});
exports.default = createEventService;
