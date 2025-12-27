import { roomSchema } from "@repo/common";
import { prisma } from "@repo/database";
import { Request, Response } from "express";

export const room = async (req: Request, res:Response)=>{
    const parsedData= roomSchema.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json({
            success:false,
            msg:"Invalid input while creating room",
            error:parsedData.error.flatten().fieldErrors
        })
    }
    const userId= req.userId
    try {
        const room= await prisma.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })
    return res.status(200).json({
        success:true,
        msg:"room created",
        name: room.slug,
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            msg:"internal server error"
        })
    }
}