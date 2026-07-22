import Link from "next/link";
import {
  ClipboardList,
  BookOpen,
  Users,
  Star,
  Trophy,
  Award,
  ArrowRight,
  Download,
} from "lucide-react";

const links = [
  { href: "/challenges", label: "Challenges", desc: "View all challenge steps", icon: ClipboardList, color: "bg-blue-500" },
  { href: "/modules", label: "Modules", desc: "144 SQL exercises", icon: BookOpen, color: "bg-green-500" },
  { href: "/teams", label: "Teams", desc: "10 competing teams", icon: Users, color: "bg-purple-500" },
  { href: "/scoring", label: "Scoring", desc: "Enter judge scores", icon: Star, color: "bg-yellow-500" },
  { href: "/leaderboard", label: "Leaderboard", desc: "Live rankings", icon: Trophy, color: "bg-orange-500" },
  { href: "/awards", label: "Awards", desc: "Special recognition", icon: Award, color: "bg-red-500" },
  {
    href: "/pub.sql", // SQL file in public folder
    label: "Download Database",
    desc: "Download the PUBS SQL Database",
    icon: Download,
    color: "bg-green-600",
    download: true,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-3xl text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-2 text-5xl font-bold text-white">SQL Story Campaign</h1>
        <p className="mb-2 text-xl text-yellow-400">PUBS: The Publishing House Crisis</p>
        <p className="mb-10 text-slate-400">
          Your database is a publishing business. Data is messy: wrong cities, missing authors,
          strange discounts. You are the Data Response Team. Your SQL decides the company&apos;s future.
        </p>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 rounded-xl bg-slate-800 p-4 text-left transition-all hover:bg-slate-700 hover:ring-1 hover:ring-slate-600"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${link.color} text-white`}>
                <link.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{link.label}</p>
                <p className="text-sm text-slate-400">{link.desc}</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400">10 Teams</span>
          <span>·</span>
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400">8 Steps</span>
          <span>·</span>
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400">144 Exercises</span>
          <span>·</span>
          <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-400">70 Max Points</span>
        </div>
      </div>
    </div>
  );
}
