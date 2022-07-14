export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserUp {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
}
