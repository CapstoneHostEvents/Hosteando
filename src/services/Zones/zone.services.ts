import { AppDataSource } from "../../data-source";
import { IZoneRequest } from "../../interfaces/zones";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";
import { Event } from "../../entities/Event";

export default class CreateZoneService {
  async execute({ name, price, total_tickets, eventId }: IZoneRequest) {
    const zoneRepository = AppDataSource.getRepository(Zone);
    const eventRepository = AppDataSource.getRepository(Event);

    const zones = await zoneRepository.find();
    const event = await eventRepository.findOneBy({
      id: eventId,
    });

    if (!event) throw new AppError("Event not found", 404);

    if (zones.find((z) => z.name === name))
      throw new AppError("Email already exists", 400);

    const zone = zoneRepository.create({
      name,
      price,
      total_tickets,
    });

    await zoneRepository.save(zone);

    event.zones = [zone];

    await eventRepository.save(event);

    return zone;
  }
}

/*export const getListUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  // MAP PARA RETORNAR SEM PASSWORD
  const noPWusers = users.map((user) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  });

  return noPWusers;
};

export const listOneUserService = async (idSearch: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

  //VAR PARA RETORNAR SEM PASSWORD
  const returnedUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    age: user.age,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return returnedUser;
};

export const DeleteUserService = async (idSearch: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

  await userRepository.remove(user);

  return true;
};

export const UpdateUserService = async (
  idSearch: string,
  body: IUserRequest
) => {
  const userRepository = AppDataSource.getRepository(User);

  let user = await userRepository.findOneBy({ id: idSearch });

  if (!user) throw new AppError("User not found", 404);

  // DESCONSTRUÇÃO Q RECEBE DEAFULT O VALOR ORIGINAL DO USER
  const {
    email = user.email,
    password,
    name = user.name,
    age = user.age,
  } = body;

  const hashedPassword = password ? await hash(password, 10) : user.password;

  // VAR PARA SALVAR UPDATE
  const updatedUser = {
    ...user,
    email,
    hashedPassword,
    name,
    age,
    updated_at: new Date(Date.now()),
  };

  await userRepository.save(updatedUser);

  // VAR PARA RETORNAR SEM PASSWORD
  const returnedUser = {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    age: updatedUser.age,
    created_at: updatedUser.created_at,
    updated_at: updatedUser.updated_at,
  };

  return returnedUser;
};
*/
