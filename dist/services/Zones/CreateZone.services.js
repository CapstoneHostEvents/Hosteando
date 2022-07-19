"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Zone_1 = require("../../entities/Zone");
const app_error_1 = __importDefault(require("../../errors/app-error"));
const Event_1 = require("../../entities/Event");
class CreateZoneService {
    execute({ name, price, total_tickets, eventId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const zoneRepository = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
            const eventRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
            const zones = yield zoneRepository.find();
            const event = yield eventRepository.findOneBy({
                id: eventId,
            });
            if (!event)
                throw new app_error_1.default("Event not found", 404);
            if (zones.find((z) => z.name === name && z.event.id === eventId)) {
                throw new app_error_1.default("Name alrealdy used for that event", 400);
            }
            const zone = zoneRepository.create({
                name,
                price,
                total_tickets,
            });
            zone.event = event;
            yield zoneRepository.save(zone);
            return zone;
        });
    }
}
exports.default = CreateZoneService;
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
