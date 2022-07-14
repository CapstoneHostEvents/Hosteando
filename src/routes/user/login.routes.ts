import { Router } from "express";
import UserController from "../../controllers/user/userControllers";

const loginRouter = Router();
const userController = new UserController();

loginRouter.post("", userController.login);

export default loginRouter;