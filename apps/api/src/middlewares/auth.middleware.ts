import { JWT_SECRET } from "@repo/backend-common";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

interface UserJwtPayload {
  userId: string;
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization ?? "";
  const rawToken = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  const token = rawToken.startsWith("Bearer ")
    ? rawToken.slice("Bearer ".length).trim()
    : rawToken.trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Missing authorization token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserJwtPayload | string;

    if (typeof decoded === "string" || !decoded.userId) {
      return res.status(401).json({
        success: false,
        msg: "Invalid token payload",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
      error: (error as Error).message,
    });
  }
};
