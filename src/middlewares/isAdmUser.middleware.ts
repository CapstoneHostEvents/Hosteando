import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app-error";

const isAdmUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError("User is not admin", 403);
  }

  next();
};

export default isAdmUserMiddleware;
