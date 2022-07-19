import { Router } from "express";
import UserController from "../../controllers/user/userControllers";
import {
  handleLoginError,
  validateLoginCreate,
} from "../../middlewares/schemaValidationLogin.middleware";

const loginRouter = Router();
const userController = new UserController();

loginRouter.post(
  "",
  validateLoginCreate(handleLoginError),
  userController.login
);

export default loginRouter;
