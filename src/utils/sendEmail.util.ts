import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/user";
import "dotenv/config";
import AppError from "../errors/app-error";
import { DataSource } from "typeorm";

const sendEmailUser = async ({ to, subject, text }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter
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
      throw new AppError("Error sendind email, try again", 500);
    });
};
export default sendEmailUser;
