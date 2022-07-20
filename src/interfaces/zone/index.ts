import { Ticket } from "../../entities/Tickets";
import { IEventList } from "../event";

export interface IZoneRequest {
  name: string;
  price: number;
  total_tickets: number;
  eventId: string;
}

export interface IZoneCreate {
  name: string;
  price: number;
  total_tickets: number;
  eventId: string;
  userId: string;
}

export interface IZoneUpdate extends IZoneRequest {
  zoneId: string;
}

export interface IZoneList {
  total_tickets: number;
  id: string;
  name: string;
  price: number;
  created_at: Date;
  event: IEventList;
}
