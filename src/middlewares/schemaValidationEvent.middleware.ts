import { Request, Response, NextFunction } from "express"
import { IEventRequest } from "../interfaces/events/index"
import * as yup from "yup"
import { SchemaOf } from "yup"

export const handleEventError: SchemaOf<IEventRequest> = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  user: yup.string()
});

export const validateEventCreate =
  (schema: SchemaOf<IEventRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newEvent = validatedData

        next();
      } catch (err: any) {
        return res.status(400).json({
          status: "error",
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err)
    }
  }