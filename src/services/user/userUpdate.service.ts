import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";
import * as bcrypt from "bcryptjs";
import { IUser, IUserUp } from "../../interfaces/user";

const userUpdateService = async ({
  id,
  isAdm,
  name,
  email,
  password,
}: IUserUp): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id },
  });
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  isAdm ? (user.isAdm = isAdm) : user.isAdm;
  name ? (user.name = name) : user.name;
  email ? (user.email = email) : user.email;
  password ? (user.password = await bcrypt.hash(password, 10)) : user.password;

  return userRepository.save(user);
};
export default userUpdateService;
