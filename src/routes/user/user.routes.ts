import { Router } from "express";
import UserController from "../../controllers/user/userControllers";

const userRouter = Router();
const userController = new UserController();
userRouter.post("", userController.store);
userRouter.get("", userController.index);
userRouter.get("/:id", userController.show);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
