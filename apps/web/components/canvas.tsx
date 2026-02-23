"use client";

import { RoomCanvas } from "@/components/RoomCanvas";

export function Canvas({ roomId }: { roomId: string }) {
  return <RoomCanvas roomId={roomId} />;
}
