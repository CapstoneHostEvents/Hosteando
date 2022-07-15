import { ITicketRequest, ITicket } from "../../interfaces/ticket";
import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/Tickets";
import { Zone } from "../../entities/Zone";
import { User } from "../../entities/User";
import AppError from "../../errors/app-error";

const ticketCreateService = async ({ userId, zoneId } : ITicketRequest) =>{

  const ticketRepository = AppDataSource.getRepository(Ticket);
  const userRepository = AppDataSource.getRepository(User);
  const zoneRepository = AppDataSource.getRepository(Zone);
  
  const user = await userRepository.findOneBy({id: userId });
  if(!user){
    throw new AppError("User not found", 400);
  }

  const zone = await zoneRepository.findOneBy({ id: zoneId });
  if(!zone){
    throw new AppError("Zone not found", 400);
  }

  const tickets = await ticketRepository
    .createQueryBuilder()
    .select('t.created_at')
    .from(Ticket, 't')
    .where("t.zoneId = :zone_id",{zone_id:zoneId})
    .getMany();

  if (tickets.length > zone.total_tickets){
    throw new AppError("All tickets from this zone were already created", 409);
  }

  let newTicket = new Ticket();
  newTicket.user = user;
  newTicket.zone = zone;

  newTicket = ticketRepository.create(newTicket);
  await ticketRepository.save(newTicket);

  return {
    id: newTicket.id, 
    userId: newTicket.user.id, 
    zoneId: newTicket.zone.id,
    created_at: newTicket.created_at
  }
}

export default ticketCreateService;