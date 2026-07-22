import { query } from "@/lib/db";
import { getStepContent, STEPS } from "@/lib/challenge-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ChallengeRow {
  id: number;
  step_number: number;
  name: string;
  max_score: number;
}

interface ScoreRow {
  team_name: string;
  team_color: string | null;
  criterion_name: string;
  scorer_type: string;
  points: number;
  max_possible: number;
}

const STEP_MAX_SCORES: Record<number, number> = {
  0: 0, 1: 0, 2: 10, 3: 20, 4: 10, 5: 10, 6: 10, 7: 10,
};

function getFallbackChallenge(id: number): ChallengeRow | null {
  const stepIndex = id - 1;
  if (stepIndex < 0 || stepIndex >= STEPS.length) return null;
  const step = STEPS[stepIndex];
  return {
    id,
    step_number: step.stepNumber,
    name: step.name,
    max_score: STEP_MAX_SCORES[step.stepNumber] ?? 0,
  };
}

export default async function ScoringChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const parsedId = parseInt(challengeId);

  let ch: ChallengeRow | null = null;
  try {
    ch = await query<ChallengeRow[]>(
      "SELECT id, step_number, name, max_score FROM challenges WHERE id = ?",
      [parsedId]
    ).then((rows) => rows[0] || null);
  } catch {
    ch = getFallbackChallenge(parsedId);
  }
  if (!ch) {
    ch = getFallbackChallenge(parsedId);
  }
  if (!ch) return notFound();

  const content = getStepContent(ch.step_number);

  let scores: ScoreRow[] = [];
  try {
    scores = await query<ScoreRow[]>(
      `SELECT t.name as team_name, t.color as team_color,
        sc.name as criterion_name, s.scorer_type, s.points, s.max_possible
      FROM scores s
      JOIN teams t ON s.team_id = t.id
      JOIN scoring_criteria sc ON s.criterion_id = sc.id
      WHERE s.challenge_id = ?
      ORDER BY t.name, sc.sort_order`,
      [ch.id]
    );
  } catch {}

  const scoresByTeam = scores.reduce(
    (acc, s) => {
      if (!acc[s.team_name]) acc[s.team_name] = { color: s.team_color, scores: [] };
      acc[s.team_name].scores.push(s);
      return acc;
    },
    {} as Record<string, { color: string | null; scores: ScoreRow[] }>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="default">Step {ch.step_number}</Badge>
          <h1 className="mt-2 text-2xl font-bold">{ch.name}</h1>
        </div>
        <Link href="/scoring">
          <Button>
            <Star size={16} className="mr-1" /> Enter Scores
          </Button>
        </Link>
      </div>

      {content && (
        <Card>
          <CardHeader>
            <CardTitle>Story Hook</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">{content.storyHook}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Team Scores</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(scoresByTeam).length === 0 ? (
            <p className="text-sm text-slate-500">No scores entered yet for this challenge.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(scoresByTeam).map(([teamName, data]) => (
                <div key={teamName} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      style={{ borderColor: data.color || "#94a3b8", color: data.color || "#64748b" }}
                    >
                      {teamName}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {data.scores.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-slate-600">{s.criterion_name} ({s.scorer_type})</span>
                        <span className="font-mono">{s.points}/{s.max_possible}</span>
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
