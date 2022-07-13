export interface IZoneRequest {
  name: string;
  price: number;
  total_tickets: number;
  eventId: string;
}

/*export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface IUser extends IUserRequest {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export type IUserReturnNoPasword = Omit<IUser, "password">;
*/
