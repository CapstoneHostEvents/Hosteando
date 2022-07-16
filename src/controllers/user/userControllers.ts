import { Request, Response } from "express";
import { IEmailRequest } from "../../interfaces/user";
import userCreateService from "../../services/user/userCreate.service";
import userDeleteService from "../../services/user/userDelete.service";
import userListService from "../../services/user/userList.service";
import userListIndexService from "../../services/user/userListIndex.service";
import userLoginService from "../../services/user/userLogin.service";
import userSendEmailService from "../../services/user/userSendEmail.service";
import userUpdateService from "../../services/user/userUpdate.service";

export default class UserController {
  //Criando User
  async store(req: Request, res: Response) {
    const { isAdm, name, email, password } = req.newUser;
    const createUser = await userCreateService({
      isAdm,
      name,
      email,
      password,
    });
    return res.status(201).json(createUser);
  }
  //Listando todos os usuários
  async index(req: Request, res: Response) {
    const users = await userListService();
    return res.status(200).json(users);
  }

  //Listar User por Id
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const listbyId = await userListIndexService(id);
    return res.status(200).json(listbyId);
  }
  //Atualizar User
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { isAdm, name, email, password } = req.body;

    const updateUser = await userUpdateService({
      isAdm,
      name,
      email,
      password,
      id,
    });
    return res.status(200).json({ message: "User updated!" });
  }
  //Deletando User
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const deleteUser = await userDeleteService(id);
    return res.status(200).json({ message: "User deleted!" });
  }
  //Login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await userLoginService({ email, password });
    return res.status(201).json({ token });
  }
  //Email
  async sendemail(req: Request, res: Response) {
    const { subject, to, text }: IEmailRequest = req.body;
    const emailuser = await userSendEmailService({ subject, to, text });
    return res.status(200).json({ message: "Email succeed" });
  }
}
