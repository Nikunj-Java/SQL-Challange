import { query } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { STEPS } from "@/lib/challenge-data";
import { ArrowRight } from "lucide-react";

interface ChallengeRow {
  id: number;
  step_number: number;
  name: string;
  max_score: number;
}

export default async function ChallengesPage() {
  let challenges: ChallengeRow[];
  try {
    challenges = await query<ChallengeRow[]>(
      "SELECT id, step_number, name, max_score FROM challenges ORDER BY sort_order"
    );
  } catch {
    challenges = STEPS.map((s, i) => ({
      id: i + 1,
      step_number: s.stepNumber,
      name: s.name,
      max_score: s.stepNumber === 2 ? 10 : s.stepNumber === 3 ? 20 : s.stepNumber >= 4 ? 10 : 0,
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Challenges</h1>
        <p className="text-slate-500">8 steps of the SQL Story Campaign</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((ch) => {
          const content = STEPS.find((s) => s.stepNumber === ch.step_number);
          const isScored = ch.max_score > 0;

          return (
            <Link key={ch.id} href={`/challenges/${ch.id}`}>
              <Card className="h-full transition-all hover:ring-2 hover:ring-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant={isScored ? "default" : "secondary"}>
                      Step {ch.step_number}
                    </Badge>
                    {isScored && <Badge variant="outline">{ch.max_score} pts</Badge>}
                  </div>
                  <CardTitle className="text-lg">{ch.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {content?.storyHook || ch.name}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-blue-600">
                    View details <ArrowRight size={14} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
