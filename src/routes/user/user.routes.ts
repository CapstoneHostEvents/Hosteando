import { Router } from "express";
import UserController from "../../controllers/user/userControllers";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmUserMiddleware from "../../middlewares/isAdmUser.middleware";
import { handleUserError, validateUserCreate } from "../../middlewares/schemaValidation.middleware";

const userRouter = Router();
const userController = new UserController();
userRouter.post("", validateUserCreate(handleUserError), userController.store);
userRouter.get("", authMiddleware, isAdmUserMiddleware, userController.index);
userRouter.get("/:id", userController.show);
userRouter.patch("/:id", validateUserCreate(handleUserError), userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
