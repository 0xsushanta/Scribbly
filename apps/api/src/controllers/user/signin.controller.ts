import { signinUserSchema } from "@repo/common";
import { Request, Response } from "express";
import {prisma} from "@repo/database"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common"
export const signin= async (req:Request,res:Response)=>{
    try {
        const parsedData= signinUserSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(400).json({
                success:false,
                msg: "Invalid input while signin",
                error: parsedData.error.flatten().fieldErrors
            })
        }
        const {email, password}= parsedData.data
        const user= await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Invalid request data. Please check your email"
            })
        }
        const passMatch= await bcrypt.compare(password, user.password)
        if(!passMatch){
            return res.status(404).json({
                success: false,
                msg: "Invalid request data. Please check your password"
            }) 
        }
        const userId= user.id
        const token=jwt.sign({userId},JWT_SECRET, {expiresIn:"1h"})
        return res.status(200).json({
            success:true,
            msg:"user signed in",
            token: token
        })
    } catch (error) {
         console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    }
}