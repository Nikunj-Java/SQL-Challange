import { cn } from "@/lib/utils";
import { Radio } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="lg:hidden w-10" />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1">
          <Radio size={12} className="text-green-600" />
          <span className="text-xs font-medium text-green-700">Live</span>
        </div>
      </div>
    </header>
  );
}
