"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { User, ChevronRight, ChevronLeft, Save } from "lucide-react";

const CHALLENGES = [
  { id: 2, name: "Step 2: Surveillance", criteria: ["Correct Query", "Clear Explanation", "Storytelling"] },
  { id: 3, name: "Step 3: Emergency Data Ops", criteria: ["Correctness", "Safety & Risk Assessment", "Verification", "Business Explanation", "SQL Hygiene"] },
  { id: 4, name: "Step 4: Boardroom KPIs", criteria: ["KPI Quality", "Risk Identification", "Recommendation"] },
  { id: 5, name: "Step 5: Relationships", criteria: ["Correct JOIN", "Cross-examination Q&A", "Referential Integrity"] },
  { id: 6, name: "Step 6: Special Functions", criteria: ["Feature Quality", "Creativity", "Presentation"] },
  { id: 7, name: "Step 7: Board Meeting", criteria: ["Crisis Narrative", "Insight Depth", "Fix/Risk/Recommendation"] },
];

const MAX_POINTS: Record<string, Record<string, number>> = {
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

export default function SelfScoringPage() {
  const [step, setStep] = useState(0);
  const [teamId, setTeamId] = useState<string | null>("");
  const [challengeId, setChallengeId] = useState<string | null>("");
  const [criterionIndex, setCriterionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const challenge = CHALLENGES.find((c) => c.id.toString() === challengeId);
  const criteria = challenge?.criteria || [];
  const currentCriterion = criteria[criterionIndex];
  const maxPts = challenge ? (MAX_POINTS[challenge.name]?.[currentCriterion || ""] || 0) : 0;

  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
  const totalMax = challenge
    ? Object.values(MAX_POINTS[challenge.name] || {}).reduce((s, v) => s + v, 0)
    : 0;

  async function handleSubmit() {
    if (!teamId || !challengeId) {
      toast.error("Please select your team and challenge");
      return;
    }
    setSubmitting(true);
    try {
      for (const [criterion, score] of Object.entries(scores)) {
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            challengeId: parseInt(challengeId),
            teamId: parseInt(teamId),
            criterionName: criterion,
            scorerType: "self",
            points: score,
            maxPossible: MAX_POINTS[challenge?.name || ""]?.[criterion] || 0,
            notes: notes[criterion] || "",
          }),
        });
        if (!res.ok) throw new Error("Failed");
      }
      toast.success("Self-score submitted!");
      setStep(0);
      setScores({});
      setNotes({});
    } catch {
      toast.error("Failed to submit. Is the database running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Team Self-Scoring</h1>
        <p className="text-slate-500">Assess your team&apos;s performance on each step</p>
      </div>

      {/* Step 0: Select Team */}
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} /> Step 1: Select Your Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={teamId} onValueChange={(v) => setTeamId(v ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select your team" />
              </SelectTrigger>
              <SelectContent>
                {TEAMS.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => teamId && setStep(1)} disabled={!teamId}>
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Select Challenge */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Select Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={challengeId} onValueChange={(v) => setChallengeId(v ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a challenge" />
              </SelectTrigger>
              <SelectContent>
                {CHALLENGES.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={() => { if (challengeId) { setCriterionIndex(0); setStep(2); } }} disabled={!challengeId}>
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Score Criteria */}
      {step === 2 && challenge && currentCriterion && (
        <Card>
          <CardHeader>
            <CardTitle>Criterion {criterionIndex + 1}/{criteria.length}: {currentCriterion}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Points (0 - {maxPts})</Label>
              <Input
                type="number"
                min={0}
                max={maxPts}
                step={0.5}
                value={scores[currentCriterion] ?? ""}
                onChange={(e) => setScores({ ...scores, [currentCriterion]: parseFloat(e.target.value) || 0 })}
                className="mt-1 text-lg"
              />
            </div>
            <div>
              <Label>Reflection (optional)</Label>
              <Textarea
                placeholder="How did your team perform on this criterion?"
                value={notes[currentCriterion] || ""}
                onChange={(e) => setNotes({ ...notes, [currentCriterion]: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCriterionIndex(Math.max(0, criterionIndex - 1))} disabled={criterionIndex === 0}>
                <ChevronLeft size={16} className="mr-1" /> Previous
              </Button>
              {criterionIndex < criteria.length - 1 ? (
                <Button onClick={() => setCriterionIndex(criterionIndex + 1)}>
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              ) : (
                <Button onClick={() => setStep(3)}>
                  Review <ChevronRight size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && challenge && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {criteria.map((c) => {
                const max = MAX_POINTS[challenge.name]?.[c] || 0;
                return (
                  <div key={c} className="flex justify-between rounded border p-2">
                    <span className="text-sm">{c}</span>
                    <span className="font-mono text-sm">{scores[c] ?? "—"}/{max}</span>
                  </div>
                );
              })}
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">{totalScore}/{totalMax}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ChevronLeft size={16} className="mr-1" /> Edit
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                <Save size={16} className="mr-1" /> {submitting ? "Submitting..." : "Submit Self-Score"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
