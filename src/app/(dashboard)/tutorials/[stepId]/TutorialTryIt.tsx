"use client";

import { useState } from "react";
import { Eye, EyeOff, Lightbulb, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PASSCODE_HASH = "90363681060467cef1c7ac85c946522ef3cb00b5fc386064de79faf5df57a547";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface TutorialTryItProps {
  tryIt: {
    question: string;
    hint: string;
    solution: string;
  };
}

export function TutorialTryIt({ tryIt }: TutorialTryItProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleShowSolution = () => {
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
    <div className="space-y-3">
      <p className="text-sm font-medium text-amber-900">{tryIt.question}</p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHint(!showHint)}
          className="border-amber-300 bg-white text-amber-700 hover:bg-amber-100"
        >
          {showHint ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
          {showHint ? "Hide Hint" : "Show Hint"}
        </Button>

        {!showSolution && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleShowSolution}
            className="border-amber-300 bg-white text-amber-700 hover:bg-amber-100"
          >
            <Lock size={14} className="mr-1" />
            Show Solution
          </Button>
        )}

        {showSolution && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSolution(false)}
            className="border-amber-300 bg-white text-amber-700 hover:bg-amber-100"
          >
            <EyeOff size={14} className="mr-1" />
            Hide Solution
          </Button>
        )}
      </div>

      {showHint && (
        <div className="rounded-lg border border-amber-200 bg-white p-3">
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="mt-0.5 text-amber-500" />
            <p className="text-xs text-amber-700">{tryIt.hint}</p>
          </div>
        </div>
      )}

      {showPasscode && (
        <div className="rounded-lg border border-amber-200 bg-white p-4">
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
        <div className="rounded-lg border border-amber-200 bg-white p-3">
          <div className="flex items-center gap-1 mb-2">
            <Unlock size={12} className="text-green-600" />
            <p className="text-[10px] font-medium text-green-600">Solution unlocked</p>
          </div>
          <p className="mb-1 text-xs font-medium text-slate-500">Solution:</p>
          <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-sm text-green-400">
            <code>{tryIt.solution}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
