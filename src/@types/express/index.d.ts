import * as express from "express";
import { IEventRequest } from "../../interfaces/events/index";
import { IUserRequest } from "../../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      newEvent: IEventRequest;
      newUser: IUserRequest;
      user: {
        id: string;
        isAdm: boolean;
      };
    }
  }
}
