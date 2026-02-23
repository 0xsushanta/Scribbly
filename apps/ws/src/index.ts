import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/database";
import { JWT_SECRET } from "@repo/backend-common";

const wsPort = Number(process.env.WS_PORT ?? 8080);
const wss = new WebSocketServer({ port: wsPort });

interface UserConnection {
  room: string[];
  userId: string;
  ws: WebSocket;
}

const users: UserConnection[] = [];

function verifyUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url ?? "";
  const queryParams = new URLSearchParams(url.split("?")[1] ?? "");
  const token = queryParams.get("token");

  if (!token) {
    ws.close();
    return;
  }

  const userId = verifyUser(token);
  if (!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    room: [],
    ws,
  });

  ws.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data.toString()) as {
        type?: "join_room" | "leave_room" | "chat";
        roomId?: string;
        message?: string;
      };

      if (!parsedData.type) {
        return;
      }

      if (parsedData.type === "join_room") {
        if (!parsedData.roomId) {
          return;
        }

        const user = users.find((connection) => connection.ws === ws);
        if (user && !user.room.includes(parsedData.roomId)) {
          user.room.push(parsedData.roomId);
        }
        return;
      }

      if (parsedData.type === "leave_room") {
        if (!parsedData.roomId) {
          return;
        }

        const user = users.find((connection) => connection.ws === ws);
        if (!user) {
          return;
        }

        user.room = user.room.filter((roomId) => roomId !== parsedData.roomId);
        return;
      }

      if (parsedData.type !== "chat" || !parsedData.roomId || !parsedData.message) {
        return;
      }

      const roomId = Number(parsedData.roomId);
      if (Number.isNaN(roomId)) {
        return;
      }

      await prisma.chat.create({
        data: {
          message: parsedData.message,
          roomId,
          userId,
        },
      });

      users.forEach((connection) => {
        if (connection.room.includes(parsedData.roomId!)) {
          connection.ws.send(
            JSON.stringify({
              type: "chat",
              message: parsedData.message,
              roomId: parsedData.roomId,
            }),
          );
        }
      });
    } catch (error) {
      console.error("WebSocket message handling error:", error);
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((connection) => connection.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});

console.log(`WebSocket server is running on ${wsPort}`);
