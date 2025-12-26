import { Request, Response } from "express";
import { createUserSchema } from "@repo/common";
import { prisma } from "@repo/database";
import bcrypt from "bcrypt"
export const signup = async (req: Request, res: Response) => {
  try {
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
  const sameUsername= await prisma.user.findUnique({
    where:{
        username
    }
  })
  if(sameUsername){
    return res.status(403).json({
        success:false,
        code: "USERNAME_ALREADY_EXISTS",
        msg:"This username is already taken"
    })
  }
   const hashedPass= await bcrypt.hash(password, 12)
    await prisma.user.create({
        data:{
            name,
            username,
            password:hashedPass,
            email
        }
    })
    return res.status(200).json({
        success: true,
        msg: "Account created successfully"
    })
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
