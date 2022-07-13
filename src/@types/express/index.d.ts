import * as express from "express"
import { IEventRequest } from "../../interfaces/events/index"

declare global {
    namespace Express {
        interface Request {
            newEvent:IEventRequest;
            user: {
                id: string
                isAdm: boolean
            }
        }
    }
}