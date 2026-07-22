"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Users,
  Star,
  Trophy,
  Award,
  HelpCircle,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/how-to-play", label: "How to Play", icon: HelpCircle },
  { href: "/challenges", label: "Challenges", icon: ClipboardList },
  { href: "/tutorials", label: "SQL Tutorials", icon: GraduationCap },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/scoring", label: "Scoring", icon: Star },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/awards", label: "Awards", icon: Award },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-md bg-slate-900 p-2 text-white lg:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-white transition-transform duration-200 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-slate-700 px-6">
          <div>
            <h1 className="text-lg font-bold">SQL Story Campaign</h1>
            <p className="text-xs text-slate-400">PUBS: The Crisis</p>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-4">
          <p className="text-xs text-slate-500">Data Response Team</p>
          <p className="text-xs text-slate-500">Board Meeting Edition</p>
        </div>
      </aside>
    </>
  );
}
