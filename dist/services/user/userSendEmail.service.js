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
const sendEmail_util_1 = __importDefault(require("../../utils/sendEmail.util"));
const userSendEmailService = ({ to, subject, text, }) => __awaiter(void 0, void 0, void 0, function* () {
    const htmlText = `<h1 style=\"background-color:powderblue\">${subject}</h1><h3 style=\"font-size:160%;\">${text} segue o link https://www.youtube.com/watch?v=QPJQhNDQhk8</h3>`;
    yield (0, sendEmail_util_1.default)({ subject, text: htmlText, to });
});
exports.default = userSendEmailService;
