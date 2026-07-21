import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ClipboardList,
  Target,
  Trophy,
  Award,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const ROLES = [
  { name: "Query Writer", duty: "Writes and executes SQL queries" },
  { name: "Data Checker", duty: "Verifies results and catches errors" },
  { name: "Performance & Best Practice", duty: "Optimizes queries and checks formatting" },
  { name: "Storyteller", duty: "Turns data into business narrative" },
  { name: "Presenter", duty: "Presents findings to the board" },
];

const STEPS = [
  {
    step: 0,
    name: "Diagnostics Quiz",
    points: "0 pts (baseline)",
    description: "Individual SQL competency quiz. No collaboration.",
    time: "15 min",
  },
  {
    step: 1,
    name: "Evidence Board",
    points: "0 pts (setup)",
    description: "Draw the database schema relationship map on a whiteboard.",
    time: "10 min",
  },
  {
    step: 2,
    name: "Surveillance",
    points: "10 pts",
    description: "Survey the data landscape. Run SELECT queries and present one story insight.",
    time: "15 min",
  },
  {
    step: 3,
    name: "Emergency Data Operations",
    points: "20 pts",
    description: "Fix the data. Execute INSERT, UPDATE, and DELETE with safety checks.",
    time: "20 min",
  },
  {
    step: 4,
    name: "Boardroom KPIs",
    points: "10 pts",
    description: "Derive business KPIs from aggregate queries. Identify risks and recommendations.",
    time: "15 min",
  },
  {
    step: 5,
    name: "Relationships & Missing Links",
    points: "10 pts",
    description: "Write JOIN queries. Find missing links and explain LEFT vs INNER JOIN.",
    time: "15 min",
  },
  {
    step: 6,
    name: "Special Functions & Advanced",
    points: "10 pts",
    description: "Build a mini product feature using string, date, CASE, or NULL handling functions.",
    time: "15 min",
  },
  {
    step: 7,
    name: "Board Meeting Presentation",
    points: "10 pts",
    description: "Deliver a 2-minute board meeting report following the 5-part structure.",
    time: "2 min",
  },
];

const AWARDS = [
  { name: "Data Crisis Champions", description: "Highest total score across all scored steps" },
  { name: "SQL Story Masters", description: "Best storytelling and narrative presentation" },
  { name: "Query Performance Award", description: "Most efficient and clean SQL queries" },
  { name: "Rising Data Detectives", description: "Most improved from Diagnostics to final score" },
];

export default function HowToPlayPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">How to Play</h1>
        <p className="text-slate-500">
          Complete guide to running the SQL Story Campaign challenge
        </p>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={18} /> Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>SQL Story Campaign</strong> is a team-based SQL competition where teams
            investigate and fix data issues in the classic <strong>PUBS</strong> publishing
            database before a critical board meeting.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">10 Teams</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">5 Roles per Team</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">8 Challenge Steps</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">70 Max Points</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">4 Awards</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={18} /> Step 1: Team Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            Form teams of <strong>5 members</strong>. Each member takes on a specific role:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => (
              <div key={role.name} className="rounded-lg border p-3">
                <p className="font-medium">{role.name}</p>
                <p className="text-xs text-slate-500">{role.duty}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500">
            Teams: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet
          </p>
        </CardContent>
      </Card>

      {/* Challenge Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList size={18} /> Step 2: Challenge Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Teams progress through <strong>8 challenge steps</strong> in order. Each step
            builds on the previous one. Steps 0 and 1 are setup; Steps 2-7 are scored.
          </p>
          <div className="space-y-2">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <Badge
                  variant={s.step < 2 ? "secondary" : "default"}
                  className="mt-0.5 shrink-0"
                >
                  Step {s.step}
                </Badge>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{s.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {s.points}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {s.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={18} /> Step 3: Scoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Each scored step (2-7) has <strong>scoring criteria</strong> evaluated by a
            judge. Teams can also self-score for practice.
          </p>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="font-medium">Scoring Breakdown</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              <li>
                <strong>Step 2 (Surveillance):</strong> 10 pts — Correct Query, Clear
                Explanation, Storytelling
              </li>
              <li>
                <strong>Step 3 (Data Operations):</strong> 20 pts — Correctness, Safety &
                Risk, Verification, Business Explanation, SQL Hygiene
              </li>
              <li>
                <strong>Step 4 (Boardroom KPIs):</strong> 10 pts — KPI Quality, Risk
                Identification, Recommendation
              </li>
              <li>
                <strong>Step 5 (Relationships):</strong> 10 pts — Correct JOIN,
                Cross-examination Q&A, Referential Integrity
              </li>
              <li>
                <strong>Step 6 (Special Functions):</strong> 10 pts — Feature Quality,
                Creativity, Presentation
              </li>
              <li>
                <strong>Step 7 (Board Meeting):</strong> 10 pts — Crisis Narrative, Insight
                Depth, Fix/Risk/Recommendation
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Awards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={18} /> Step 4: Awards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>At the end of the challenge, 4 awards are given:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {AWARDS.map((a) => (
              <div key={a.name} className="rounded-lg border p-3">
                <p className="font-medium">{a.name}</p>
                <p className="text-xs text-slate-500">{a.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips for Success */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={18} /> Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="mt-0.5 text-green-500" />
              <span>
                <strong>Practice first:</strong> Use the Modules tab to practice exercises
                before attempting scored challenges.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="mt-0.5 text-green-500" />
              <span>
                <strong>Communicate:</strong> Each role has a specific job. Query Writer
                writes, Data Checker verifies, Storyteller narrates.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="mt-0.5 text-green-500" />
              <span>
                <strong>Tell a story:</strong> The board wants narratives, not raw data.
                Format insights as &quot;We discovered ___ and it implies ___.&quot;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="mt-0.5 text-green-500" />
              <span>
                <strong>Be safe:</strong> Always explain risks before running INSERT/UPDATE/DELETE.
                Always verify with SELECT after changes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={14} className="mt-0.5 text-green-500" />
              <span>
                <strong>Time management:</strong> Each step has a suggested time limit. Don&apos;t
                spend too long on one step.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Using the App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight size={18} /> Using This App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Dashboard
              </Badge>
              <span>Overview of challenge progress and team status.</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Challenges
              </Badge>
              <span>
                Click any challenge to see instructions, example queries, module exercises,
                and scoring rubric.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Modules
              </Badge>
              <span>
                Practice exercises organized by SQL topic. One exercise at a time with
                solutions hidden by default.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Scoring
              </Badge>
              <span>
                Judge scoring page. Select team, pick challenge, score each criterion.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Leaderboard
              </Badge>
              <span>Live ranked table of all teams.</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="shrink-0">
                Awards
              </Badge>
              <span>Final awards displayed after all steps are complete.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle size={18} /> Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-yellow-700">
          <ul className="space-y-2">
            <li>
              • Steps 0 and 1 are <strong>not scored</strong> — they are setup/baseline.
            </li>
            <li>
              • Step 3 (Data Operations) is worth <strong>20 points</strong> — the highest
              value step.
            </li>
            <li>
              • The facilitator can run the challenge with <strong>no timer</strong> — pace
              is self-directed.
            </li>
            <li>
              • All pages work <strong>without MySQL</strong> — using static fallback data.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
