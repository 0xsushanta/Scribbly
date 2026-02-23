"use client";

import { Button } from "@/components/Button";
import { TOKEN_KEY, getApiBackend } from "@/config";
import axios from "axios";
import { ArrowLeft, LogOut, Plus, Waypoints } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CanvasLobbyPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const createRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const token = window.localStorage.getItem(TOKEN_KEY);
      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await axios.post(
        `${getApiBackend()}/room`,
        {
          name: roomName.trim() || `room-${Date.now()}`,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      router.push(`/canvas/${response.data.id}`);
    } catch (err) {
      setError(readErrorMessage(err));
    } finally {
      setIsCreating(false);
    }
  };

  const joinRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedRoomId = joinRoomId.trim();
    if (!/^\d+$/.test(normalizedRoomId)) {
      setError("Room ID must be a number.");
      return;
    }

    router.push(`/canvas/${normalizedRoomId}`);
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#DBEAFE]/30 via-white to-[#60A5FA]/20 px-4 py-10">
      <div className="w-full max-w-3xl space-y-6 rounded-3xl border border-[#3B82F6]/20 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Canvas Workspace</h1>
            <p className="text-sm text-slate-600">Create a room or join an existing one.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
              <ArrowLeft size={16} />
              Home
            </Link>
            <Button variant="outline" className="border-slate-300 text-slate-700" onClick={logout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={createRoom} className="space-y-4 rounded-2xl border border-[#3B82F6]/20 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Plus size={18} />
              Create Room
            </h2>
            <input
              type="text"
              placeholder="Optional room name"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none transition focus:border-[#3B82F6]"
            />
            <Button type="submit" className="w-full justify-center" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create and open"}
            </Button>
          </form>

          <form onSubmit={joinRoom} className="space-y-4 rounded-2xl border border-[#3B82F6]/20 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Waypoints size={18} />
              Join Room
            </h2>
            <input
              type="text"
              placeholder="Enter room ID"
              value={joinRoomId}
              onChange={(event) => setJoinRoomId(event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none transition focus:border-[#3B82F6]"
            />
            <Button type="submit" variant="secondary" className="w-full justify-center">
              Open room
            </Button>
          </form>
        </div>

        {error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

function readErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { msg?: string; message?: string } | undefined)?.msg ??
      (error.response?.data as { msg?: string; message?: string } | undefined)?.message ??
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
