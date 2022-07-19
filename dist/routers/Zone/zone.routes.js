"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zone_controller_1 = __importDefault(require("../../controllers/Zones/zone.controller"));
const zoneRoutes = (0, express_1.default)();
const zoneController = new zone_controller_1.default();
zoneRoutes.post("", zoneController.store);
zoneRoutes.get("", zoneController.show);
zoneRoutes.get("/:zoneId", zoneController.index);
zoneRoutes.get("/event/:eventId", zoneController.indexEvent);
exports.default = zoneRoutes;
