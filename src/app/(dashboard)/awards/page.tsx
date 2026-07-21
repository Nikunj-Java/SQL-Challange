"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Award, Trophy } from "lucide-react";

const AWARDS = [
  { name: "Best Data Detective", desc: "Best JOINs insight — uncovered hidden relationships in the data", icon: "🔍" },
  { name: "Best Boardroom Story", desc: "Best narrative — turned SQL results into compelling business story", icon: "📖" },
  { name: "Best SQL Hygiene", desc: "Clean aliases, readable queries, proper formatting throughout", icon: "✨" },
  { name: "Best Risk Awareness", desc: "Safe updates, rollback planning, constraint discussion", icon: "🛡️" },
];

export default function AwardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Awards</h1>
        <p className="text-slate-500">Special recognition for outstanding performance</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {AWARDS.map((award) => (
          <Card key={award.name} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{award.icon}</span>
                <div>
                  <CardTitle className="text-lg">{award.name}</CardTitle>
                  <p className="text-sm text-slate-600">{award.desc}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="outline">Not yet awarded</Badge>
              <Link href="/leaderboard">
                <Button variant="outline" size="sm">
                  <Trophy size={14} className="mr-1" /> View Leaderboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Awards Are Determined</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p><strong>Best Data Detective:</strong> Highest score on Step 5 (Relationships) — best JOINs insight</p>
          <p><strong>Best Boardroom Story:</strong> Highest score on Step 7 (Presentation) — best narrative</p>
          <p><strong>Best SQL Hygiene:</strong> Highest combined SQL Hygiene scores across all steps</p>
          <p><strong>Best Risk Awareness:</strong> Highest Safety & Risk Assessment score on Step 3</p>
        </CardContent>
      </Card>
    </div>
  );
}
