import { Ticket } from "../../entities/Tickets";
import { AppDataSource } from "../../data-source";

const ticketListService = async (): Promise<Ticket[]> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const ticketList = await ticketRepository
    .createQueryBuilder()
    .select(["Ticket.id, Ticket.user.id, Ticket.zone.id, Ticket.created_at"])
    .getRawMany();

  return ticketList;
};

export default ticketListService;
