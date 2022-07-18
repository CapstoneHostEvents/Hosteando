import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";

const userListIndexService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    select: {
      id:true,
      name: true,
      isAdm: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  const users = user.find((userId) => userId.id === id);
  if (!users) {
    throw new AppError("User not found!", 404);
  }
  return users;
};

export default userListIndexService;
