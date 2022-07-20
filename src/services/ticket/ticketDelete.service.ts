import { AppDataSource } from "../../data-source"
import { Ticket } from "../../entities/Tickets"
import AppError from "../../errors/app-error";

const ticketDeleteService = async (id: string): Promise<void> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const [ticket] = await ticketRepository.find({where:{id}})

  console.log(ticket)

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  await ticketRepository.delete(ticket.id);
}

export default ticketDeleteService;