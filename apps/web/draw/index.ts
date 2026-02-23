import { API_BACKEND } from "@/config";
import axios from "axios";

type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};

type CircleShape = {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
};

export type Shape = RectShape | CircleShape;
export type DrawTool = "rect" | "circle";

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  getSelectedTool: () => DrawTool,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  const existingShapes = await getExistingShapes(roomId);

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);
    clearCanvas(existingShapes, canvas, ctx);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  const getCoordinates = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawShape = (shape: Shape) => {
    ctx.strokeStyle = "rgba(255, 255, 255)";
    ctx.lineWidth = 2;

    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      return;
    }

    ctx.beginPath();
    ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  };

  const handleSocketMessage = (event: MessageEvent) => {
    try {
      const payload = JSON.parse(event.data) as {
        type?: string;
        message?: string;
      };

      if (payload.type !== "chat" || !payload.message) {
        return;
      }

      const parsedMessage = JSON.parse(payload.message) as { shape?: Shape };
      if (!parsedMessage.shape || !isShape(parsedMessage.shape)) {
        return;
      }

      existingShapes.push(parsedMessage.shape);
      clearCanvas(existingShapes, canvas, ctx);
    } catch (error) {
      console.error("Failed to process websocket message:", error);
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    isDrawing = true;
    const point = getCoordinates(event);
    startX = point.x;
    startY = point.y;
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDrawing) {
      return;
    }

    isDrawing = false;
    const point = getCoordinates(event);
    const width = point.x - startX;
    const height = point.y - startY;

    let shape: Shape | null = null;
    const selectedTool = getSelectedTool();
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      const centerX = width >= 0 ? startX + radius : startX - radius;
      const centerY = height >= 0 ? startY + radius : startY - radius;
      shape = {
        type: "circle",
        centerX,
        centerY,
        radius,
      };
    }

    if (!shape) {
      return;
    }

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      }),
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDrawing) {
      return;
    }

    const point = getCoordinates(event);
    const width = point.x - startX;
    const height = point.y - startY;

    clearCanvas(existingShapes, canvas, ctx);
    const selectedTool = getSelectedTool();

    if (selectedTool === "rect") {
      drawShape({
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      });
      return;
    }

    const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
    const centerX = width >= 0 ? startX + radius : startX - radius;
    const centerY = height >= 0 ? startY + radius : startY - radius;
    drawShape({
      type: "circle",
      centerX,
      centerY,
      radius,
    });
  };

  const handleMouseLeave = () => {
    isDrawing = false;
    clearCanvas(existingShapes, canvas, ctx);
  };

  socket.addEventListener("message", handleSocketMessage);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    socket.removeEventListener("message", handleSocketMessage);
    window.removeEventListener("resize", resizeCanvas);
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
  };
}

function clearCanvas(shapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255, 255, 255)";
  ctx.lineWidth = 2;

  shapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      return;
    }

    ctx.beginPath();
    ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  });
}

async function getExistingShapes(roomId: string): Promise<Shape[]> {
  try {
    const response = await axios.get(`${API_BACKEND}/chats/${roomId}`);
    const messages = (response.data.messages ?? []) as Array<{ message: string }>;

    return messages
      .slice()
      .reverse()
      .map((message) => {
        try {
          const parsed = JSON.parse(message.message) as { shape?: Shape };
          if (parsed.shape && isShape(parsed.shape)) {
            return parsed.shape;
          }
          return null;
        } catch {
          return null;
        }
      })
      .filter((shape): shape is Shape => shape !== null);
  } catch (error) {
    console.error("Failed to load existing shapes:", error);
    return [];
  }
}

function isShape(value: Shape | unknown): value is Shape {
  if (!value || typeof value !== "object" || !("type" in value)) {
    return false;
  }

  const shape = value as Partial<Shape>;
  if (shape.type === "rect") {
    return (
      typeof shape.x === "number" &&
      typeof shape.y === "number" &&
      typeof shape.width === "number" &&
      typeof shape.height === "number"
    );
  }

  if (shape.type === "circle") {
    return (
      typeof shape.centerX === "number" &&
      typeof shape.centerY === "number" &&
      typeof shape.radius === "number"
    );
  }

  return false;
}
