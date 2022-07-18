import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IZoneRequest } from "../interfaces/zones";
import * as yup from "yup";

export const handleZoneError: SchemaOf<IZoneRequest> = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  total_tickets: yup.number().required(),
  eventId: yup.string().required(),
  userId: yup.string(),
});

const validateZoneCreate =
  (schema: SchemaOf<IZoneRequest>) =>
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

export default validateZoneCreate;
