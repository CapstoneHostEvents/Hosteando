import { IEmailRequest } from "../../interfaces/user";
import sendEmailUser from "../../utils/sendEmail.util";

const userSendEmailService = async ({ to, subject, text }: IEmailRequest):Promise<void> => {
    await sendEmailUser({subject, text, to})
};

export default userSendEmailService;
