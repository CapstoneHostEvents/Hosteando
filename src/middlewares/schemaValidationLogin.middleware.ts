import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/user";

export const handleLoginError: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
 password: yup.string().required(),
});

export const validateLoginCreate =
  (schema: SchemaOf<IUserLogin>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newLogin = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          status: "error",
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
