import { RoomCanvas } from "@/components/RoomCanvas";

export default function CanvasPage({
  params,
}: {
  params: {
    roomId: string;
  };
}) {
  return <RoomCanvas roomId={params.roomId} />;
}
