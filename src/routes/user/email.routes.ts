import { Router } from "express";
import UserController from "../../controllers/user/userControllers";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmUserMiddleware from "../../middlewares/isAdmUser.middleware";

const emailRouter = Router();
const userController = new UserController();

emailRouter.post("", authMiddleware, isAdmUserMiddleware, userController.sendemail);

export default emailRouter;
