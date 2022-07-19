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
exports.removeDuplicates21657651238893 = void 0;
class removeDuplicates21657651238893 {
    constructor() {
        this.name = 'removeDuplicates21657651238893';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "zone" DROP COLUMN "event_id"`);
            yield queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "user_id"`);
            yield queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "zone_id"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ticket" ADD "zone_id" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ticket" ADD "user_id" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "zone" ADD "event_id" character varying NOT NULL`);
        });
    }
}
exports.removeDuplicates21657651238893 = removeDuplicates21657651238893;
