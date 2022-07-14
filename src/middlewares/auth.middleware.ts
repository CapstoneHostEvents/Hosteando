import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"
import AppError from "../errors/app-error";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token){
        throw new AppError("Invalid token", 401);  
    }

    const splitToken = token.split(" ")

    jwt.verify(splitToken[1], process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if(error){
        throw new AppError("Invalid token", 401);   
        }

        req.user = {
            id: decoded.id,
            isAdm: decoded.adm
        }

        next()

    })

}

export default authMiddleware