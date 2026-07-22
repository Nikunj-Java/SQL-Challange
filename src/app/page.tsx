import Link from "next/link";
import {
  ClipboardList,
  Trophy,
  Award,
  ArrowRight,
  Download,
} from "lucide-react";

const links = [
  {
    href: "/challenges",
    label: "Challenges",
    desc: "View all challenge steps",
    icon: ClipboardList,
    color: "bg-blue-500",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    desc: "Live rankings",
    icon: Trophy,
    color: "bg-orange-500",
  },
  {
    href: "/awards",
    label: "Awards",
    desc: "Special recognition",
    icon: Award,
    color: "bg-red-500",
  },
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
      <div className="max-w-4xl text-center">
        <div className="mb-4 text-6xl">🔍</div>

        <h1 className="mb-2 text-5xl font-bold text-white">
          SQL Story Campaign
        </h1>

        <p className="mb-2 text-xl text-yellow-400">
          PUBS: The Publishing House Crisis
        </p>

        <p className="mb-10 text-slate-400">
          Your database is a publishing business. Data is messy: wrong cities,
          missing authors, strange discounts. You are the Data Response Team.
          Your SQL decides the company's future.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              download={link.download}
              className="group flex items-center gap-4 rounded-xl bg-slate-800 p-5 text-left transition-all hover:bg-slate-700 hover:ring-2 hover:ring-blue-500"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-lg ${link.color} text-white`}
              >
                <link.icon size={26} />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">
                  {link.label}
                </h2>

                <p className="text-sm text-slate-400">
                  {link.desc}
                </p>
              </div>

              <ArrowRight
                size={18}
                className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-white"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}