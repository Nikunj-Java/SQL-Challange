import { TUTORIALS, getTutorialByStepId } from "@/lib/tutorial-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Lightbulb, Code, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TutorialTryIt } from "./TutorialTryIt";

export function generateStaticParams() {
  return TUTORIALS.map((t) => ({ stepId: String(t.stepId) }));
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ stepId: string }>;
}) {
  const { stepId } = await params;
  const step = parseInt(stepId);
  const tutorial = getTutorialByStepId(step);

  if (!tutorial) return notFound();

  const prevStep = step > 0 ? step - 1 : null;
  const nextStep = step < 7 ? step + 1 : null;
  const prevTutorial = prevStep !== null ? getTutorialByStepId(prevStep) : null;
  const nextTutorial = nextStep !== null ? getTutorialByStepId(nextStep) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Step {tutorial.stepId}</Badge>
          <Badge variant="outline">{tutorial.sections.length} sections</Badge>
        </div>
        <h1 className="mt-2 text-2xl font-bold">{tutorial.title}</h1>
        <p className="text-slate-500">{tutorial.subtitle}</p>
      </div>

      {/* Introduction */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm leading-relaxed text-slate-700">
            {tutorial.introduction}
          </p>
        </CardContent>
      </Card>

      {/* Sections */}
      {tutorial.sections.map((section, i) => (
        <div key={i} className="space-y-4">
          {/* Section number and concept */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {i + 1}
            </div>
            <h2 className="text-lg font-bold">{section.concept}</h2>
          </div>

          {/* Explanation */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed text-slate-700">
                {section.explanation}
              </p>
            </CardContent>
          </Card>

          {/* Syntax */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Code size={16} /> Syntax
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-green-400">
                <code>{section.syntax}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{section.exampleTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                <strong>Input:</strong> {section.exampleInput}
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-slate-500">Query:</p>
                <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-green-400">
                  <code>{section.exampleQuery}</code>
                </pre>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-slate-500">Output:</p>
                <pre className="overflow-x-auto rounded-lg bg-slate-50 border p-3 text-xs text-slate-700">
                  <code>{section.exampleOutput}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Try It */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-amber-800">
                <Lightbulb size={16} /> Try It Yourself
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TutorialTryIt tryIt={section.tryIt} />
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-base text-green-800">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-green-700">
            {tutorial.summary}
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t pt-6">
        {prevTutorial ? (
          <Link
            href={`/tutorials/${prevStep}`}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft size={16} />
            <div>
              <p className="text-xs text-slate-400">Previous</p>
              <p className="font-medium">{prevTutorial.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextTutorial ? (
          <Link
            href={`/tutorials/${nextStep}`}
            className="flex items-center gap-2 text-right text-sm text-slate-600 hover:text-slate-900"
          >
            <div>
              <p className="text-xs text-slate-400">Next</p>
              <p className="font-medium">{nextTutorial.title}</p>
            </div>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <Link
            href="/challenges"
            className="flex items-center gap-2 text-right text-sm text-slate-600 hover:text-slate-900"
          >
            <div>
              <p className="text-xs text-slate-400">Done!</p>
              <p className="font-medium">Back to Challenges</p>
            </div>
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
