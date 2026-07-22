import { TUTORIALS } from "@/lib/tutorial-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, ChevronRight } from "lucide-react";
import Link from "next/link";

const STEP_COLORS = [
  "bg-slate-100 text-slate-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
];

export default function TutorialsIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">SQL Tutorials</h1>
        <p className="text-slate-500">
          Learn SQL from scratch — step-by-step tutorials for each challenge
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <BookOpen size={20} className="mt-0.5 text-blue-600" />
          <div className="text-sm">
            <p className="font-medium text-blue-800">Beginner-Friendly</p>
            <p className="text-blue-700">
              Each tutorial starts from zero — no prior SQL knowledge required. You will
              learn the concept, see the syntax, view examples with input/output, and
              practice with a mini exercise before attempting the real challenge.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {TUTORIALS.map((tutorial) => (
          <Link key={tutorial.stepId} href={`/tutorials/${tutorial.stepId}`}>
            <Card className="group h-full transition-colors hover:border-slate-400 hover:bg-slate-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={STEP_COLORS[tutorial.stepId] || "bg-slate-100 text-slate-700"}>
                    Step {tutorial.stepId}
                  </Badge>
                  <ChevronRight
                    size={16}
                    className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-600"
                  />
                </div>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-500">{tutorial.subtitle}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Code size={12} />
                  <span>{tutorial.sections.length} sections</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
