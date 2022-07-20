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

export interface IZoneUpdate extends IZoneCreate {
  zoneId: string;
}

export interface IZoneDelete {
  zoneId: string;
  userId: string;
}
