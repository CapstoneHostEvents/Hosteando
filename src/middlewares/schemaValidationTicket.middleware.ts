import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITicketRequest } from "../interfaces/ticket";

export const handleTicketError: SchemaOf<ITicketRequest> = yup.object().shape({
  userId: yup.string().required(),
  zoneId: yup.string().required()
});

export const validateTicketCreate =
  (schema: SchemaOf<ITicketRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, { abortEarly: false });
      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.errors.join(", "),
      });
    }
  };

