import { IEmailRequest } from "../../interfaces/user";
import sendEmailUser from "../../utils/sendEmail.util";

const userSendEmailService = async ({
  to,
  subject,
  text,
}: IEmailRequest): Promise<void> => {
  const htmlText = `<h1 style=\"background-color:powderblue\">${subject}</h1><h3 style=\"font-size:160%;\">${text} segue o link https://www.youtube.com/watch?v=QPJQhNDQhk8</h3>`;
  await sendEmailUser({ subject, text: htmlText, to });
};

export default userSendEmailService;
