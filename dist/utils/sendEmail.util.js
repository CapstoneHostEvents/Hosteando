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
const nodemailer_1 = require("nodemailer");
require("dotenv/config");
const app_error_1 = __importDefault(require("../errors/app-error"));
const sendEmailUser = ({ to, subject, text }) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = (0, nodemailer_1.createTransport)({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    yield transporter
        .sendMail({
        from: "userhosteando@outlook.com",
        to: to,
        subject: subject,
        html: text,
    })
        .then(() => {
        console.log("Email sent with success");
    })
        .catch((err) => {
        console.log(err);
        throw new app_error_1.default("Error sendind email, try again", 500);
    });
});
exports.default = sendEmailUser;
