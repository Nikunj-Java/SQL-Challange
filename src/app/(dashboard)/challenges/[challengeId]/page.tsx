import { queryOne, query } from "@/lib/db";
import { getStepContent, STEPS } from "@/lib/challenge-data";
import { MODULES } from "@/lib/module-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { Code, Lightbulb, Target, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";

interface ChallengeRow {
  id: number;
  step_number: number;
  name: string;
  description: string | null;
  max_score: number;
}

interface CriterionRow {
  name: string;
  description: string | null;
  max_points: number;
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
    description: step.storyHook,
    max_score: STEP_MAX_SCORES[step.stepNumber] ?? 0,
  };
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const parsedId = parseInt(challengeId);

  let ch: ChallengeRow | null = null;
  try {
    ch = await queryOne<ChallengeRow>(
      "SELECT id, step_number, name, description, max_score FROM challenges WHERE id = ?",
      [parsedId]
    );
  } catch {
    ch = getFallbackChallenge(parsedId);
  }
  if (!ch) {
    ch = getFallbackChallenge(parsedId);
  }
  if (!ch) return notFound();

  const content = getStepContent(ch.step_number);

  let criteria: CriterionRow[] = [];
  try {
    criteria = await query<CriterionRow[]>(
      "SELECT name, description, max_points FROM scoring_criteria WHERE challenge_id = ? ORDER BY sort_order",
      [ch.id]
    );
  } catch {
    criteria = content?.scoringRubric.map((r) => ({
      name: r.criterion,
      description: r.description,
      max_points: r.maxPoints,
    })) || [];
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Step {ch.step_number}</Badge>
          {ch.max_score > 0 && <Badge variant="outline">{ch.max_score} max points</Badge>}
        </div>
        <h1 className="mt-2 text-2xl font-bold">{ch.name}</h1>
        {content && <p className="text-slate-500">{content.storyHook}</p>}
      </div>

      <Tabs defaultValue="instructions">
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="exercises">
            <BookOpen size={14} className="mr-1" /> Module Exercises
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Code size={14} className="mr-1" /> Example Queries
          </TabsTrigger>
          {criteria.length > 0 && (
            <TabsTrigger value="rubric">
              <Target size={14} className="mr-1" /> Scoring Rubric
            </TabsTrigger>
          )}
          <TabsTrigger value="tips">
            <Lightbulb size={14} className="mr-1" /> Tips
          </TabsTrigger>
          {content?.quizQuestions && content.quizQuestions.length > 0 && (
            <TabsTrigger value="quiz">
              <MessageSquare size={14} className="mr-1" /> Quiz Questions
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="instructions">
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 pl-5">
                {(content?.instructions || [ch.description || "No instructions available"]).map(
                  (inst, i) => (
                    <li key={i} className="list-decimal text-sm">
                      {inst}
                    </li>
                  )
                )}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Module Exercises for This Step</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const mod = MODULES.find((m) => m.stepMapping === ch.step_number);
                if (!mod) {
                  return (
                    <p className="text-sm text-slate-500">
                      No module exercises for this step.
                    </p>
                  );
                }
                return (
                  <div className="space-y-4">
                    {mod.subTopics.map((st, i) => (
                      <div key={i}>
                        <h4 className="mb-2 font-medium">
                          {st.name} ({st.exercises.length} exercises)
                        </h4>
                        <ul className="space-y-1 pl-5">
                          {st.exercises.map((ex, j) => (
                            <li key={j} className="list-decimal text-sm">
                              <Link
                                href={`/modules/${mod.moduleNumber}/exercises/${ex.exerciseNumber}`}
                                className="text-blue-600 hover:underline"
                              >
                                {ex.exerciseNumber}
                              </Link>
                              {" — "}
                              {ex.instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Example Queries</CardTitle>
            </CardHeader>
            <CardContent>
              {content?.exampleQueries && content.exampleQueries.length > 0 ? (
                <div className="space-y-4">
                  {content.exampleQueries.map((eq, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <p className="mb-2 text-sm font-medium text-slate-700">{eq.description}</p>
                      <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-sm text-green-400">
                        <code>{eq.sql}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No example queries for this step.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rubric">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Rubric</CardTitle>
            </CardHeader>
            <CardContent>
              {criteria.length > 0 ? (
                <div className="space-y-3">
                  {criteria.map((c, i) => (
                    <div key={i} className="flex items-start justify-between rounded-lg border p-3">
                      <div className="flex-1">
                        <p className="font-medium">{c.name}</p>
                        {c.description && (
                          <p className="text-sm text-slate-500">{c.description}</p>
                        )}
                      </div>
                      <Badge variant="secondary">{c.max_points} pts</Badge>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t pt-3">
                    <p className="font-bold">Total</p>
                    <Badge>{ch.max_score} pts</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">No scoring criteria for this step.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb size={18} /> Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              {content?.tips && content.tips.length > 0 ? (
                <ul className="space-y-2">
                  {content.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <MessageSquare size={14} className="mt-0.5 text-yellow-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">No tips for this step.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {content?.quizQuestions && content.quizQuestions.length > 0 && (
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Diagnostic Quiz Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.quizQuestions.map((q, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <p className="text-sm font-medium">{q.question}</p>
                      <p className="mt-1 text-xs text-slate-500">Hint: {q.hint}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
