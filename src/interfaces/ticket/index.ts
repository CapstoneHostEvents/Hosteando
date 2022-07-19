export interface ITicketRequest {
  userId: string;
  zoneId: string;
}

export interface ITicket {
  id: string;
  userId: string;
  zoneId: string;
  created_at: Date;
}
