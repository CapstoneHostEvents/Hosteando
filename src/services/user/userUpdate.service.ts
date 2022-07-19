import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";
import * as bcrypt from "bcryptjs";
import { IUserReq, IUserUp } from "../../interfaces/user";

const userUpdateService = async ({
  id,
  isAdm,
  name,
  email,
  password,
  user
}: IUserUp) : Promise<IUserReq>=> {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findOne({
    where: { id },
  });
  if (!users) {
    throw new AppError("User not found!", 404);
  }
   
  if (user?.id !== id) {
    throw new AppError("Has to be the same user", 403);
  }
  
  if (isAdm) throw new AppError("Cannot change isAdm for an User", 403);

  name ? (user.name = name) : user.name;
  email ? (user.email = email) : user.email;
  password ? (user.password = await bcrypt.hash(password, 10)) : user.password;

  return userRepository.save(user);
};
export default userUpdateService;
