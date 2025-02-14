import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center text-accentthirty bg-gray-100">
      <Loader2 className="w-24 h-24 animate-spin" />
    </div>
  );
}
