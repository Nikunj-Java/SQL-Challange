"use client";

import { MODULES } from "@/lib/module-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const PASSCODE_HASH = "90363681060467cef1c7ac85c946522ef3cb00b5fc386064de79faf5df57a547";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ExerciseDetailPage() {
  const params = useParams();
  const moduleId = parseInt(params.moduleId as string);
  const exerciseNumber = decodeURIComponent(params.exerciseId as string);

  const mod = MODULES.find((m) => m.moduleNumber === moduleId);
  if (!mod) return <div>Module not found</div>;

  const allExercises = mod.subTopics.flatMap((st) =>
    st.exercises.map((ex) => ({ ...ex, subTopic: st.name }))
  );

  const currentIndex = allExercises.findIndex((ex) => ex.exerciseNumber === exerciseNumber);
  if (currentIndex === -1) return <div>Exercise not found</div>;

  const exercise = allExercises[currentIndex];
  const prev = currentIndex > 0 ? allExercises[currentIndex - 1] : null;
  const next = currentIndex < allExercises.length - 1 ? allExercises[currentIndex + 1] : null;

  const [showSolution, setShowSolution] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleRevealSolution = () => {
    setShowPasscode(true);
    setPasscode("");
    setPasscodeError(false);
  };

  const handleVerifyPasscode = async () => {
    setVerifying(true);
    setPasscodeError(false);
    const hash = await sha256(passcode);
    if (hash === PASSCODE_HASH) {
      setShowSolution(true);
      setShowPasscode(false);
      setPasscode("");
    } else {
      setPasscodeError(true);
    }
    setVerifying(false);
  };

  const handleCancelPasscode = () => {
    setShowPasscode(false);
    setPasscode("");
    setPasscodeError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerifyPasscode();
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/modules/${moduleId}`} className="hover:text-blue-600">
          Module {moduleId}
        </Link>
        <span>/</span>
        <span>{exercise.subTopic}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="font-mono">
            Exercise {exercise.exerciseNumber}
          </Badge>
          <h1 className="mt-2 text-xl font-bold">Module {moduleId} — {exercise.subTopic}</h1>
        </div>
        <Badge
          variant={
            exercise.difficulty === "easy"
              ? "default"
              : exercise.difficulty === "medium"
              ? "secondary"
              : "destructive"
          }
        >
          {exercise.difficulty}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{exercise.instruction}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye size={18} /> Solution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showSolution && !showPasscode && (
            <Button variant="outline" onClick={handleRevealSolution}>
              <Lock size={16} className="mr-2" /> Reveal Solution
            </Button>
          )}

          {showPasscode && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={14} className="text-amber-600" />
                <p className="text-xs font-medium text-amber-800">Enter passcode to reveal solution</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="4-digit passcode"
                  maxLength={4}
                  autoFocus
                  className="w-32 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Button
                  size="sm"
                  onClick={handleVerifyPasscode}
                  disabled={passcode.length !== 4 || verifying}
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  {verifying ? "Checking..." : "Unlock"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelPasscode}
                  className="text-slate-500"
                >
                  Cancel
                </Button>
              </div>
              {passcodeError && (
                <p className="mt-2 text-xs text-red-600">Incorrect passcode. Try again.</p>
              )}
            </div>
          )}

          {showSolution && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Unlock size={12} className="text-green-600" />
                <p className="text-[10px] font-medium text-green-600">Solution unlocked</p>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                <code>{exercise.expectedQuery}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          {prev ? (
            <Link href={`/modules/${moduleId}/exercises/${encodeURIComponent(prev.exerciseNumber)}`}>
              <Button variant="outline">
                <ChevronLeft size={16} className="mr-1" /> Previous
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <Button
          variant={completed ? "default" : "outline"}
          onClick={() => setCompleted(!completed)}
        >
          <CheckCircle size={16} className="mr-1" />
          {completed ? "Completed!" : "Mark as completed"}
        </Button>

        <div>
          {next ? (
            <Link href={`/modules/${moduleId}/exercises/${encodeURIComponent(next.exerciseNumber)}`}>
              <Button>
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          ) : (
            <Link href={`/modules/${moduleId}`}>
              <Button variant="outline">Back to Module</Button>
            </Link>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-slate-500">
        {currentIndex + 1} of {allExercises.length} exercises
      </p>
    </div>
  );
}
