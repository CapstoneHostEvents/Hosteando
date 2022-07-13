import * as express from "express"
import { IUserRequest } from "../../interfaces/user"

declare global {
    namespace Express {
        interface Request {
            newUser:IUserRequest;
            user: {
                id: string
                isAdm: boolean
            }
        }
    }
}