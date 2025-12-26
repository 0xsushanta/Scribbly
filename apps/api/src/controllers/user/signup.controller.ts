import { Request, Response } from "express";
import { createUserSchema } from "@repo/common";
import { prisma } from "@repo/database";

export const signup = async (req: Request, res: Response) => {
  const parsedData = createUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input while signup",
      errors: parsedData.error.flatten().fieldErrors,
    });
  }

  const { email, name, username, password } = parsedData.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(409).json({
      success: false,
      error: {
        code: "USER_ALREADY_EXISTS",
        message: "An account with this email already exists",
      },
    });
  }
};
