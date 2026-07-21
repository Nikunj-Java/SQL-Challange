import { getLeaderboard } from "@/lib/db/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RankIndicator, TeamBadge, ScoreDisplay } from "@/components/shared";
import { Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  let leaderboard;
  try {
    leaderboard = await getLeaderboard();
  } catch {
    leaderboard = Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      teamId: i + 1,
      teamName: `Team ${["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"][i]}`,
      teamColor: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#F59E0B"][i],
      judgeTotal: 0,
      selfTotal: 0,
      combinedTotal: 0,
      scoreCount: 0,
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-slate-500">Live rankings — updates automatically</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Current Standings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="pb-3 pr-4">Rank</th>
                  <th className="pb-3 pr-4">Team</th>
                  <th className="pb-3 pr-4 text-right">Judge</th>
                  <th className="pb-3 pr-4 text-right">Self</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.teamId}
                    className={`border-b last:border-0 ${
                      entry.rank === 1 ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="py-4 pr-4">
                      <RankIndicator rank={entry.rank} />
                    </td>
                    <td className="py-4 pr-4">
                      <TeamBadge name={entry.teamName} color={entry.teamColor} />
                    </td>
                    <td className="py-4 pr-4 text-right text-sm tabular-nums">
                      {entry.judgeTotal}
                    </td>
                    <td className="py-4 pr-4 text-right text-sm tabular-nums">
                      {entry.selfTotal}
                    </td>
                    <td className="py-4 text-right">
                      <ScoreDisplay points={entry.combinedTotal} max={70} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
