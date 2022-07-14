// import { AppDataSource } from "../../data-source";
// import { ITicketRequest, ITicket } from "../../interfaces/ticket";
// import { Ticket } from "../../entities/Tickets";

// const ticketCreateService = async ({ 
//   userId, zoneId
// } : ITicketRequest): Promise<ITicket> => {

//   const ticketRepository =  AppDataSource.getRepository(Ticket);

//   // check if zoneId exists
//   // check if zone has total_tickets > created Tickets

//   const newTicket = ticketRepository.create({
//     userId,
//     zoneId,
//   });
//   await ticketRepository.save(newTicket);

//   return newTicket;
// }

// export default ticketCreateService;
import { ITicketRequest, ITicket } from "../../interfaces/ticket";
import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/Tickets";

const ticketCreateService = async ({ 
  userId, zoneId
} : ITicketRequest) =>{

  const ticketRepository = AppDataSource.getRepository(Ticket);

  const newTicket = ticketRepository.create({
    userId,
    zoneId,
  });

  await ticketRepository.save(newTicket);
  return newTicket;
}

export default ticketCreateService;