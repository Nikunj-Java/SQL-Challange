import { query } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamBadge } from "@/components/shared";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

interface TeamRow {
  id: number;
  name: string;
  color: string | null;
  totalScore: number;
}

export default async function TeamsPage() {
  let teams: TeamRow[];
  try {
    teams = await query<TeamRow[]>(
      `SELECT t.id, t.name, t.color,
        COALESCE(SUM(s.points), 0) as totalScore
      FROM teams t
      LEFT JOIN scores s ON t.id = s.team_id
      GROUP BY t.id, t.name, t.color
      ORDER BY totalScore DESC, t.name`
    );
  } catch {
    teams = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Team ${["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"][i]}`,
      color: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#F59E0B"][i],
      totalScore: 0,
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Teams</h1>
        <p className="text-slate-500">10 competing teams — 5 roles each</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`}>
            <Card className="h-full transition-all hover:ring-2 hover:ring-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <TeamBadge name={team.name} color={team.color} size="lg" />
                </div>
                <CardTitle className="text-3xl font-bold">{team.totalScore}</CardTitle>
                <p className="text-sm text-slate-500">total points</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-blue-600">
                  View details <ArrowRight size={14} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
