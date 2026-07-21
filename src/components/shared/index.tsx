import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TeamBadgeProps {
  name: string;
  color: string | null;
  size?: "sm" | "md" | "lg";
}

export function TeamBadge({ name, color, size = "md" }: TeamBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        size === "sm" && "text-xs px-1.5 py-0",
        size === "lg" && "text-sm px-3 py-1"
      )}
      style={{
        borderColor: color || "#94a3b8",
        color: color || "#64748b",
        backgroundColor: color ? `${color}15` : undefined,
      }}
    >
      {name}
    </Badge>
  );
}

interface ScoreDisplayProps {
  points: number;
  max: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreDisplay({ points, max, size = "md" }: ScoreDisplayProps) {
  const pct = max > 0 ? (points / max) * 100 : 0;
  const colorClass =
    pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600";

  return (
    <span className={cn("font-bold tabular-nums", colorClass, size === "sm" && "text-sm", size === "lg" && "text-lg")}>
      {points}/{max}
    </span>
  );
}

interface RankIndicatorProps {
  rank: number;
}

export function RankIndicator({ rank }: RankIndicatorProps) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="text-sm font-bold text-slate-500">#{rank}</span>;
}

interface StepBadgeProps {
  step: number;
}

export function StepBadge({ step }: StepBadgeProps) {
  return (
    <Badge variant="secondary" className="font-mono">
      Step {step}
    </Badge>
  );
}
