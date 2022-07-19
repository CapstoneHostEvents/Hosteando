import * as express from "express";
import { IEventRequest } from "../../interfaces/event/index";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      newLogin: IUserLogin;
      newEvent: IEventRequest;
      newUser: IUserRequest;
      user: {
        id: string;
        isAdm: boolean;
      };
    }
  }
}
