"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zone_controller_1 = __importDefault(require("../../controllers/Zones/zone.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const isAdmUser_middleware_1 = __importDefault(require("../../middlewares/isAdmUser.middleware"));
const schemaValidationZone_middleware_1 = __importStar(require("../../middlewares/schemaValidationZone.middleware"));
const zoneRoutes = (0, express_1.default)();
const zoneController = new zone_controller_1.default();
zoneRoutes.post("", auth_middleware_1.default, isAdmUser_middleware_1.default, (0, schemaValidationZone_middleware_1.default)(schemaValidationZone_middleware_1.handleZoneError), zoneController.store);
zoneRoutes.get("", auth_middleware_1.default, zoneController.index);
zoneRoutes.get("/:zoneId", auth_middleware_1.default, zoneController.show);
zoneRoutes.patch("/:zoneId", auth_middleware_1.default, isAdmUser_middleware_1.default, zoneController.update);
zoneRoutes.delete("/:zoneId", auth_middleware_1.default, isAdmUser_middleware_1.default, zoneController.delete);
exports.default = zoneRoutes;
