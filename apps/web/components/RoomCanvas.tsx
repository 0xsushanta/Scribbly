"use client";

import { TOKEN_KEY, WS_BACKEND } from "@/config";
import { DrawTool, initDraw } from "@/draw";
import { Circle, LogOut, Square } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

type ConnectionState = "connecting" | "connected" | "error";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedToolRef = useRef<DrawTool>("rect");

  const [selectedTool, setSelectedTool] = useState<DrawTool>("rect");
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const [error, setError] = useState("");

  useEffect(() => {
    selectedToolRef.current = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace("/login");
      return;
    }

    const socket = new WebSocket(`${WS_BACKEND}?token=${encodeURIComponent(token)}`);
    let drawCleanup: (() => void) | null = null;
    let unmounted = false;

    socket.addEventListener("open", async () => {
      setConnectionState("connected");
      socket.send(JSON.stringify({ type: "join_room", roomId }));

      if (!canvasRef.current) {
        return;
      }

      drawCleanup = await initDraw(canvasRef.current, roomId, socket, () => selectedToolRef.current);
    });

    socket.addEventListener("error", () => {
      setConnectionState("error");
      setError("Unable to connect to realtime server.");
    });

    socket.addEventListener("close", () => {
      if (unmounted) {
        return;
      }
      setConnectionState("error");
      setError("Realtime connection closed.");
    });

    return () => {
      unmounted = true;
      drawCleanup?.();

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "leave_room", roomId }));
      }
      socket.close();
    };
  }, [roomId, router]);

  const handleLogout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/canvas" className="text-sm text-slate-300 hover:text-white">
            Back to rooms
          </Link>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
            Room #{roomId}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              connectionState === "connected"
                ? "bg-emerald-500/20 text-emerald-300"
                : connectionState === "connecting"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-rose-500/20 text-rose-300"
            }`}
          >
            {connectionState}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              selectedTool === "rect"
                ? "bg-white text-slate-900"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => setSelectedTool("rect")}
          >
            <Square size={16} />
            Rectangle
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              selectedTool === "circle"
                ? "bg-white text-slate-900"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => setSelectedTool("circle")}
          >
            <Circle size={16} />
            Circle
          </button>
          <Button variant="outline" className="border-slate-600 text-slate-100" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {error ? (
        <div className="mx-auto w-full max-w-7xl px-4 pb-2 text-sm text-rose-300">{error}</div>
      ) : null}

      <div className="mx-auto w-full max-w-7xl px-4 pb-6">
        <div className="h-[calc(100vh-140px)] overflow-hidden rounded-2xl border border-slate-700 bg-black shadow-2xl">
          <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />
        </div>
      </div>
    </div>
  );
}
