import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";

const userDeleteService = async (id: string, user:string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userDel = users.find((userId) => userId.id === id);
  if (!userDel) {
    throw new AppError("User not found!", 404);
  }

  if (user !== id) {
    throw new AppError("Has to be the same user", 403);
  }

  await userRepository.delete(id);
};

export default userDeleteService;
