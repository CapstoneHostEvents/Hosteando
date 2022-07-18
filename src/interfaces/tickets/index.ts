interface ITicketRequest {
  userId: string;
  zoneId: string;
}

interface ITicket {
  id : string;
  userId: string;
  zoneId: string;
  created_at: Date;
}

export { ITicketRequest, ITicket };