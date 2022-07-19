import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import { IUser } from "../../interfaces/user";

const userListService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    select: {
      id: true,
      name: true,
      isAdm: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  return users;
};
export default userListService;
