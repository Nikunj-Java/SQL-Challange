"use client";

import { getTutorialByStepId } from "@/lib/tutorial-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Code } from "lucide-react";
import { TutorialTryIt } from "@/app/(dashboard)/tutorials/[stepId]/TutorialTryIt";

interface TutorialContentProps {
  stepId: number;
}

export function TutorialContent({ stepId }: TutorialContentProps) {
  const tutorial = getTutorialByStepId(stepId);
  if (!tutorial) return null;

  return (
    <div className="space-y-5 p-5">
      {/* Introduction */}
      <p className="text-sm leading-relaxed text-slate-700">
        {tutorial.introduction}
      </p>

      {/* Sections */}
      {tutorial.sections.map((section, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {i + 1}
            </div>
            <h3 className="text-sm font-bold">{section.concept}</h3>
          </div>

          <p className="text-xs leading-relaxed text-slate-600">
            {section.explanation}
          </p>

          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-500">
              <Code size={12} /> Syntax
            </p>
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-green-400">
              <code>{section.syntax}</code>
            </pre>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="p-3">
              <CardTitle className="text-xs">{section.exampleTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3 pt-0">
              <div className="rounded bg-slate-50 p-2 text-[10px] text-slate-600">
                <strong>Input:</strong> {section.exampleInput}
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-medium text-slate-500">Query:</p>
                <pre className="overflow-x-auto rounded bg-slate-900 p-2 text-[11px] text-green-400">
                  <code>{section.exampleQuery}</code>
                </pre>
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-medium text-slate-500">Output:</p>
                <pre className="overflow-x-auto rounded border bg-slate-50 p-2 text-[10px] text-slate-700">
                  <code>{section.exampleOutput}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="mb-2 flex items-center gap-1 text-xs font-bold text-amber-800">
              <Lightbulb size={12} /> Try It Yourself
            </p>
            <TutorialTryIt tryIt={section.tryIt} />
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <p className="mb-1 text-xs font-bold text-green-800">Key Takeaways</p>
        <p className="text-xs leading-relaxed text-green-700">
          {tutorial.summary}
        </p>
      </div>
    </div>
  );
}
