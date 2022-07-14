import { ITicketRequest, ITicket } from "../../interfaces/ticket";
import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/Tickets";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

const ticketCreateService = async ({ 
  userId, zoneId
} : ITicketRequest) =>{

  const ticketRepository = AppDataSource.getRepository(Ticket);
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOneBy({
    id: zoneId,
  });

  if(!zone){
    throw new AppError("Zone not found", 400);
  }
  
  const zones = await zoneRepository.find();
  if (zones.length > zone.total_tickets){
    throw new AppError("All tickets from this zone were already created", 409);
  }

  // using "any" because of Type DeepPartial issue when used with generics #2904
  const newTicket = ticketRepository.create({
    userId,
    zoneId,
  } as any);

  await ticketRepository.save(newTicket);

  return {...newTicket, userId, zoneId};
}

export default ticketCreateService;