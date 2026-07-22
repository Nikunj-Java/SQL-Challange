"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Star, Save, ChevronLeft, ChevronRight } from "lucide-react";

const CHALLENGES = [
  { id: 2, name: "Step 2: Surveillance", maxScore: 10, criteria: ["Correct Query", "Clear Explanation", "Storytelling"] },
  { id: 3, name: "Step 3: Emergency Data Ops", maxScore: 20, criteria: ["Correctness", "Safety & Risk Assessment", "Verification", "Business Explanation", "SQL Hygiene"] },
  { id: 4, name: "Step 4: Boardroom KPIs", maxScore: 10, criteria: ["KPI Quality", "Risk Identification", "Recommendation"] },
  { id: 5, name: "Step 5: Relationships", maxScore: 10, criteria: ["Correct JOIN", "Cross-examination Q&A", "Referential Integrity"] },
  { id: 6, name: "Step 6: Special Functions", maxScore: 10, criteria: ["Feature Quality", "Creativity", "Presentation"] },
  { id: 7, name: "Step 7: Board Meeting", maxScore: 10, criteria: ["Crisis Narrative", "Insight Depth", "Fix/Risk/Recommendation"] },
];

const MAX_POINTS_PER_CRITERION: Record<string, Record<string, number>> = {
  "Step 2: Surveillance": { "Correct Query": 5, "Clear Explanation": 3, "Storytelling": 2 },
  "Step 3: Emergency Data Ops": { "Correctness": 5, "Safety & Risk Assessment": 5, "Verification": 5, "Business Explanation": 3, "SQL Hygiene": 2 },
  "Step 4: Boardroom KPIs": { "KPI Quality": 5, "Risk Identification": 3, "Recommendation": 2 },
  "Step 5: Relationships": { "Correct JOIN": 5, "Cross-examination Q&A": 3, "Referential Integrity": 2 },
  "Step 6: Special Functions": { "Feature Quality": 5, "Creativity": 3, "Presentation": 2 },
  "Step 7: Board Meeting": { "Crisis Narrative": 3, "Insight Depth": 3, "Fix/Risk/Recommendation": 4 },
};

const TEAMS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Team ${["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet"][i]}`,
}));

export default function ScoringPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>("");
  const [criterionIndex, setCriterionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const challenge = CHALLENGES.find((c) => c.id.toString() === selectedChallenge);
  const criteria = challenge?.criteria || [];
  const currentCriterion = criteria[criterionIndex];
  const maxPoints = challenge ? MAX_POINTS_PER_CRITERION[challenge.name]?.[currentCriterion || ""] || 0 : 0;

  const totalScore = Object.values(scores).reduce((sum, v) => sum + v, 0);
  const totalMax = challenge
    ? Object.values(MAX_POINTS_PER_CRITERION[challenge.name] || {}).reduce((sum, v) => sum + v, 0)
    : 0;

  async function handleSubmit() {
    if (!selectedChallenge || !selectedTeam) {
      toast.error("Please select a challenge and team");
      return;
    }
    setSubmitting(true);
    try {
      for (const [criterion, score] of Object.entries(scores)) {
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            challengeId: parseInt(selectedChallenge),
            teamId: parseInt(selectedTeam),
            criterionName: criterion,
            scorerType: "judge",
            points: score,
            maxPossible: MAX_POINTS_PER_CRITERION[challenge?.name || ""]?.[criterion] || 0,
            notes: notes[criterion] || "",
          }),
        });
        if (!res.ok) throw new Error("Failed to save score");
      }
      toast.success("Score submitted successfully!");
      setScores({});
      setNotes({});
      setCriterionIndex(0);
    } catch {
      toast.error("Failed to submit score. Is the database running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Judge Scoring</h1>
        <p className="text-slate-500">Enter scores per criterion for each team</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Challenge</Label>
          <Select value={selectedChallenge} onValueChange={(v) => { setSelectedChallenge(v ?? ""); setCriterionIndex(0); setScores({}); setNotes({}); }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a challenge" />
            </SelectTrigger>
            <SelectContent>
              {CHALLENGES.filter((c) => c.maxScore > 0).map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.name} ({c.maxScore} pts)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Team</Label>
          <Select value={selectedTeam} onValueChange={(v) => setSelectedTeam(v ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {TEAMS.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {challenge && currentCriterion && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star size={18} className="text-yellow-500" />
                Criterion {criterionIndex + 1} of {criteria.length}
              </CardTitle>
              <Badge variant="outline">{currentCriterion}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="score">Points (0 - {maxPoints})</Label>
              <Input
                id="score"
                type="number"
                min={0}
                max={maxPoints}
                step={0.5}
                value={scores[currentCriterion] ?? ""}
                onChange={(e) =>
                  setScores({ ...scores, [currentCriterion]: parseFloat(e.target.value) || 0 })
                }
                className="mt-1 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add feedback for this criterion..."
                value={notes[currentCriterion] || ""}
                onChange={(e) => setNotes({ ...notes, [currentCriterion]: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCriterionIndex(Math.max(0, criterionIndex - 1))}
                disabled={criterionIndex === 0}
              >
                <ChevronLeft size={16} className="mr-1" /> Previous
              </Button>
              {criterionIndex < criteria.length - 1 ? (
                <Button onClick={() => setCriterionIndex(criterionIndex + 1)}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting}>
                  <Save size={16} className="mr-1" /> {submitting ? "Submitting..." : "Submit Score"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {challenge && (
        <Card>
          <CardHeader>
            <CardTitle>Score Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criteria.map((c) => {
                const max = MAX_POINTS_PER_CRITERION[challenge.name]?.[c] || 0;
                const val = scores[c];
                return (
                  <div key={c} className="flex items-center justify-between rounded-lg border p-2">
                    <span className="text-sm">{c}</span>
                    <span className="font-mono text-sm">
                      {val !== undefined ? val : "—"}/{max}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between border-t pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">{totalScore}/{totalMax}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
