"use client";

import { useState, ReactNode } from "react";
import { getTutorialByStepId } from "@/lib/tutorial-data";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, X, ChevronRight } from "lucide-react";
import { TutorialContent } from "@/components/shared/TutorialContent";
import Link from "next/link";

interface ChallengeTutorialPanelProps {
  stepNumber: number;
  children: ReactNode;
}

export function ChallengeTutorialPanel({
  stepNumber,
  children,
}: ChallengeTutorialPanelProps) {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const tutorial = getTutorialByStepId(stepNumber);
  const hasTutorial = !!tutorial;

  return (
    <div className="flex">
      {/* Left: Challenge content */}
      <div className="min-w-0 flex-1">
        {hasTutorial && (
          <div className="mb-4 flex items-center gap-3">
            {/* Mobile: link to standalone page */}
            <Link
              href={`/tutorials/${stepNumber}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
            >
              <GraduationCap size={14} />
              Open Tutorial
            </Link>

            {/* Desktop: toggle split-pane */}
            <button
              onClick={() => setTutorialOpen(!tutorialOpen)}
              className={`hidden items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors lg:inline-flex ${
                tutorialOpen
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <GraduationCap size={14} />
              {tutorialOpen ? "Hide Tutorial" : "Show Tutorial"}
              {!tutorialOpen && <ChevronRight size={12} />}
            </button>

            {tutorialOpen && tutorial && (
              <span className="hidden text-xs text-slate-400 lg:inline">
                {tutorial.sections.length} sections
              </span>
            )}
          </div>
        )}
        {children}
      </div>

      {/* Right: Tutorial panel (desktop only) */}
      {hasTutorial && tutorialOpen && tutorial && (
        <div className="hidden lg:block lg:w-[450px] lg:shrink-0 lg:border-l">
          <div className="sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Panel header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-[10px]">
                  Step {stepNumber}
                </Badge>
                <span className="text-sm font-bold">{tutorial.title}</span>
              </div>
              <button
                onClick={() => setTutorialOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close tutorial"
              >
                <X size={16} />
              </button>
            </div>

            {/* Panel content */}
            <TutorialContent stepId={stepNumber} />
          </div>
        </div>
      )}
    </div>
  );
}
