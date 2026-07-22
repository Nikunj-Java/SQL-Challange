import { getDashboardStats, getRecentScores } from "@/lib/db/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  ClipboardList,
  Star,
  Activity,
  Download,
} from "lucide-react";

export default async function DashboardPage() {
  let stats: Awaited<ReturnType<typeof getDashboardStats>>;
  let recentScores: Awaited<ReturnType<typeof getRecentScores>>;

  try {
    stats = await getDashboardStats();
    recentScores = await getRecentScores(10);
  } catch {
    stats = {
      totalTeams: 10,
      totalScores: 0,
      activeChallenges: 8,
      currentLeader: "No scores yet",
      leaderScore: 0,
    };
    recentScores = [];
  }

  const statCards = [
    {
      label: "Total Teams",
      value: stats.totalTeams,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Active Challenges",
      value: stats.activeChallenges,
      icon: ClipboardList,
      color: "text-green-600",
    },
    {
      label: "Scores Entered",
      value: stats.totalScores,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: "Current Leader",
      value: stats.currentLeader,
      icon: Trophy,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500">
            PUBS: The Publishing House Crisis — Overview
          </p>
        </div>

        <Button asChild>
          <a href="/download.pubs.sql" download="pubs.sql">
            <Download className="mr-2 h-4 w-4" />
            Download Database
          </a>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {card.label}
              </CardTitle>
              <card.icon size={18} className={card.color} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity size={18} />
            Recent Activity
          </CardTitle>
        </CardHeader>

        <CardContent>
          {recentScores.length === 0 ? (
            <p className="text-sm text-slate-500">
              No scores entered yet. Go to Scoring to begin.
            </p>
          ) : (
            <div className="space-y-3">
              {recentScores.map((score) => (
                <div
                  key={score.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{score.team_name}</p>
                    <p className="text-sm text-slate-500">
                      {score.challenge_name} — {score.criterion_name}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      {score.points}/{score.max_possible}
                    </p>
                    <p className="text-xs text-slate-500">
                      {score.scorer_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}