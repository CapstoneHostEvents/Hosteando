import { Ticket } from "../../entities/Tickets";
import { AppDataSource } from "../../data-source";

const ticketListService = async (): Promise<Ticket[]> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const ticketList = await ticketRepository.find();

  return ticketList;
}

export default ticketListService;
