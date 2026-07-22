import { MODULES } from "@/lib/module-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = MODULES.find((m) => m.moduleNumber === parseInt(moduleId));
  if (!mod) return notFound();

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary">Module {mod.moduleNumber}</Badge>
        <h1 className="mt-2 text-2xl font-bold">{mod.name}</h1>
        <p className="text-slate-500">Maps to Challenge Step {mod.stepMapping}</p>
      </div>

      <div className="space-y-4">
        {mod.subTopics.map((st, stIdx) => (
          <Card key={stIdx}>
            <CardHeader>
              <CardTitle className="text-lg">{st.name}</CardTitle>
              <p className="text-sm text-slate-500">{st.exercises.length} exercises</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {st.exercises.map((ex) => (
                  <Link
                    key={ex.exerciseNumber}
                    href={`/modules/${mod.moduleNumber}/exercises/${encodeURIComponent(ex.exerciseNumber)}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {ex.exerciseNumber}
                      </Badge>
                      <span className="text-sm">{ex.instruction}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          ex.difficulty === "easy"
                            ? "default"
                            : ex.difficulty === "medium"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {ex.difficulty}
                      </Badge>
                      <ArrowRight size={14} className="text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
