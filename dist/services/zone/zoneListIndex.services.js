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
const data_source_1 = require("../../data-source");
const Zone_1 = require("../../entities/Zone");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const retrieveZoneService = (zoneId) => __awaiter(void 0, void 0, void 0, function* () {
    const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
    const zone = yield zoneRepository.findOneBy({
        id: zoneId,
    });
    if (!zone)
        throw new app_error_1.default("Zone not found", 404);
    return zone;
});
exports.default = retrieveZoneService;
