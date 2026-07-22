import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MODULES } from "@/lib/module-data";
import { BookOpen, ArrowRight } from "lucide-react";

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modules</h1>
        <p className="text-slate-500">144 SQL exercises across 6 modules</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod) => {
          const totalExercises = mod.subTopics.reduce((sum, st) => sum + st.exercises.length, 0);
          return (
            <Link key={mod.moduleNumber} href={`/modules/${mod.moduleNumber}`}>
              <Card className="h-full transition-all hover:ring-2 hover:ring-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <BookOpen size={20} className="text-blue-600" />
                    </div>
                    <Badge variant="secondary">
                      Step {mod.stepMapping}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">Module {mod.moduleNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-slate-700">{mod.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {mod.subTopics.length} topics · {totalExercises} exercises
                  </p>
                  <div className="mt-3 flex items-center text-sm text-blue-600">
                    Start exercises <ArrowRight size={14} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
