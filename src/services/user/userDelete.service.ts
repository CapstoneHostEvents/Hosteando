import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";

const userDeleteService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find();

  const users = user.find((userId) => userId.id === id);
  if (!users) {
    throw new AppError("User not found!", 404);
  }
  await userRepository.delete(users!.id);
};

export default userDeleteService;
