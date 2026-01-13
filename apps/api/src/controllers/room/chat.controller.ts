import { Request, Response } from "express";
import { prisma } from "@repo/database";

export const getChat = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);

    if (isNaN(roomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roomId",
      });
    }

    const messages = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
