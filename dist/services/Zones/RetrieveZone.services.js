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
const data_source_1 = require("../../data-source");
const Zone_1 = require("../../entities/Zone");
class RetrieveZoneService {
    execute(zoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
            const zone = yield zoneRepository.findOneBy({
                id: zoneId,
            });
            return zone;
        });
    }
}
exports.default = RetrieveZoneService;
