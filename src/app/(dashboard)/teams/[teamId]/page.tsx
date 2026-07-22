import { queryOne, query } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamBadge, ScoreDisplay } from "@/components/shared";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { User } from "lucide-react";

interface TeamRow {
  id: number;
  name: string;
  color: string | null;
}

interface ScoreRow {
  challenge_name: string;
  criterion_name: string;
  scorer_type: string;
  points: number;
  max_possible: number;
}

const TEAM_NAMES = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"];
const TEAM_COLORS = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6", "#F59E0B"];

function getFallbackTeam(id: number): TeamRow | null {
  const idx = id - 1;
  if (idx < 0 || idx >= TEAM_NAMES.length) return null;
  return { id, name: `Team ${TEAM_NAMES[idx]}`, color: TEAM_COLORS[idx] };
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const parsedId = parseInt(teamId);

  let team: TeamRow | null = null;
  try {
    team = await queryOne<TeamRow>(
      "SELECT id, name, color FROM teams WHERE id = ?",
      [parsedId]
    );
  } catch {
    team = getFallbackTeam(parsedId);
  }
  if (!team) {
    team = getFallbackTeam(parsedId);
  }
  if (!team) return notFound();

  let scores: ScoreRow[] = [];
  try {
    scores = await query<ScoreRow[]>(
      `SELECT c.name as challenge_name, sc.name as criterion_name,
        s.scorer_type, s.points, s.max_possible
      FROM scores s
      JOIN challenges c ON s.challenge_id = c.id
      JOIN scoring_criteria sc ON s.criterion_id = sc.id
      WHERE s.team_id = ?
      ORDER BY c.step_number, sc.sort_order`,
      [team.id]
    );
  } catch {}

  const judgeTotal = scores
    .filter((s) => s.scorer_type === "judge")
    .reduce((sum, s) => sum + s.points, 0);
  const selfTotal = scores
    .filter((s) => s.scorer_type === "self")
    .reduce((sum, s) => sum + s.points, 0);

  // Group scores by challenge
  const scoresByChallenge = scores.reduce(
    (acc, s) => {
      if (!acc[s.challenge_name]) acc[s.challenge_name] = [];
      acc[s.challenge_name].push(s);
      return acc;
    },
    {} as Record<string, ScoreRow[]>
  );

  return (
    <div className="space-y-6">
      <div>
        <TeamBadge name={team.name} color={team.color} size="lg" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">Judge Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{judgeTotal}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">Self Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{selfTotal}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">Combined Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{judgeTotal + selfTotal}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.roles.map((role) => (
              <div key={role} className="flex items-center gap-2 rounded-lg border p-3">
                <User size={16} className="text-slate-400" />
                <span className="text-sm font-medium">{role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(scoresByChallenge).length === 0 ? (
            <p className="text-sm text-slate-500">No scores entered yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(scoresByChallenge).map(([challenge, chScores]) => (
                <div key={challenge} className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">{challenge}</h3>
                  <div className="space-y-1">
                    {chScores.map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{s.criterion_name} ({s.scorer_type})</span>
                        <ScoreDisplay points={s.points} max={s.max_possible} size="sm" />
                      </div>
                    ))}
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
