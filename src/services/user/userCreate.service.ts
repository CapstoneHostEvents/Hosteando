import { User } from "../../entities/User";
import { hash } from "bcryptjs";
import { IUserRequest, IUser } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/app-error";

const userCreateService = async ({
  isAdm,
  email,
  name,
  password,
}: IUserRequest): Promise<IUser> => {

  console.log(password)

  const userRepository = AppDataSource.getRepository(User);

  const checkUserExists = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (checkUserExists) {
    throw new AppError("This email already exists", 400);
  }
  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    isAdm,
    name,
    email,
    password: hashedPassword,
  });
  await userRepository.save(user);

const newUser = {
  id: user.id,
  isAdm:user.isAdm,
  name: user.name,
  email: user.email,
  created_at: user.created_at,
  updated_at: user.updated_at,
};

  return newUser;
};

export default userCreateService;
