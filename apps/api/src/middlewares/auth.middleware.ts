import { JWT_SECRET } from "@repo/backend-common";
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
interface userJwtPaylod{
    userId:string
}
export const middleware= (req:Request, res:Response, next:NextFunction)=>{
    const token= req.headers["authorization"]?? ""
   try {
     const decoded= jwt.verify(token, JWT_SECRET) as userJwtPaylod
    if(decoded){
        req.userId= decoded.userId
        next()
    }
   } catch (error) {
    return res.status(401).json({
        success:false,
        msg: "Invalid or expired token",
        error: (error as Error).message,
    });
   }
}