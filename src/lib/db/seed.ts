import { pool } from "./index";

const TEAMS = [
  { name: "Team Alpha", color: "#EF4444" },
  { name: "Team Bravo", color: "#F97316" },
  { name: "Team Charlie", color: "#EAB308" },
  { name: "Team Delta", color: "#22C55E" },
  { name: "Team Echo", color: "#06B6D4" },
  { name: "Team Foxtrot", color: "#3B82F6" },
  { name: "Team Golf", color: "#8B5CF6" },
  { name: "Team Hotel", color: "#EC4899" },
  { name: "Team India", color: "#14B8A6" },
  { name: "Team Juliet", color: "#F59E0B" },
];

const CHALLENGES = [
  {
    step_number: 0,
    name: "Diagnostics Quiz",
    description: "Individual 15-minute quiz. 7 questions testing basic SQL knowledge.",
    module_focus: "SELECT/WHERE/ORDER BY/JOIN",
    max_score: 0,
    sort_order: 0,
  },
  {
    step_number: 1,
    name: "Evidence Board",
    description: "Draw relationship map on paper/whiteboard showing how tables connect. Output: Evidence Board drawing.",
    module_focus: "Schema relationships",
    max_score: 0,
    sort_order: 1,
  },
  {
    step_number: 2,
    name: "Surveillance",
    description: "Before we fix anything, we must understand what's inside the system. Use SELECT, aliases, LIMIT, DISTINCT, WHERE, ORDER BY, LIKE, NULL.",
    module_focus: "SELECT/WHERE/LIMIT/DISTINCT/ORDER BY",
    max_score: 10,
    sort_order: 2,
  },
  {
    step_number: 3,
    name: "Emergency Data Operations",
    description: "Emergency operations — fix data before the board meeting. INSERT, UPDATE, DELETE.",
    module_focus: "INSERT/UPDATE/DELETE",
    max_score: 20,
    sort_order: 3,
  },
  {
    step_number: 4,
    name: "Boardroom KPIs",
    description: "The board wants numbers, not tables. Convert SQL into business thinking with aggregates, HAVING, ORDER BY.",
    module_focus: "Aggregates/HAVING/ORDER BY",
    max_score: 10,
    sort_order: 4,
  },
  {
    step_number: 5,
    name: "Relationships & Missing Links",
    description: "Connections reveal truth. Maximum investigation. JOINs and LEFT JOINs.",
    module_focus: "JOINs/LEFT JOINs",
    max_score: 10,
    sort_order: 5,
  },
  {
    step_number: 6,
    name: "Special Functions & Advanced",
    description: "Polish reports + detect anomalies. String/date/CASE/NULL handling.",
    module_focus: "String/Date/Control Flow/Constraints",
    max_score: 10,
    sort_order: 6,
  },
  {
    step_number: 7,
    name: "Board Meeting Presentation",
    description: "2-minute report. What crisis, 2 insights, 1 fix, 1 risk, 1 recommendation.",
    module_focus: "Presentation",
    max_score: 10,
    sort_order: 7,
  },
];

const SCORING_CRITERIA: Record<number, { name: string; max_points: number; description: string }[]> = {
  2: [
    { name: "Correct Query", max_points: 5, description: "SQL query runs correctly and returns expected results" },
    { name: "Clear Explanation", max_points: 3, description: "Team can explain what the query does and why" },
    { name: "Storytelling", max_points: 2, description: "Result presented as narrative insight: We discovered ___ and it implies ___" },
  ],
  3: [
    { name: "Correctness", max_points: 5, description: "INSERT/UPDATE/DELETE executes correctly" },
    { name: "Safety & Risk Assessment", max_points: 5, description: "Team identifies risks before executing changes" },
    { name: "Verification", max_points: 5, description: "Team runs SELECT to prove the fix worked" },
    { name: "Business Explanation", max_points: 3, description: "Clear business rationale for the change" },
    { name: "SQL Hygiene", max_points: 2, description: "Clean aliases, readable queries, proper formatting" },
  ],
  4: [
    { name: "KPI Quality", max_points: 5, description: "3 meaningful KPIs identified with SQL backing" },
    { name: "Risk Identification", max_points: 3, description: "1 clear business risk identified from data" },
    { name: "Recommendation", max_points: 2, description: "1 actionable recommendation to leadership" },
  ],
  5: [
    { name: "Correct JOIN", max_points: 5, description: "JOINs execute correctly with proper ON clauses" },
    { name: "Cross-examination Q&A", max_points: 3, description: "Team answers why LEFT JOIN vs INNER JOIN" },
    { name: "Referential Integrity", max_points: 2, description: "Explains how foreign keys prevent invalid data" },
  ],
  6: [
    { name: "Feature Quality", max_points: 5, description: "Mini product feature works correctly" },
    { name: "Creativity", max_points: 3, description: "Creative use of string/date/CASE/NULL functions" },
    { name: "Presentation", max_points: 2, description: "Clear presentation of the feature" },
  ],
  7: [
    { name: "Crisis Narrative", max_points: 3, description: "Clear description of what crisis was investigated" },
    { name: "Insight Depth", max_points: 3, description: "2 strong insights from SELECT/JOIN/GROUP BY" },
    { name: "Fix/Risk/Recommendation", max_points: 4, description: "1 fix applied, 1 risk identified, 1 recommendation" },
  ],
};

const AWARDS = [
  { name: "Best Data Detective", description: "Best JOINs insight — uncovered hidden relationships in the data", icon: "🔍" },
  { name: "Best Boardroom Story", description: "Best narrative — turned SQL results into compelling business story", icon: "📖" },
  { name: "Best SQL Hygiene", description: "Clean aliases, readable queries, proper formatting throughout", icon: "✨" },
  { name: "Best Risk Awareness", description: "Safe updates, rollback planning, constraint discussion", icon: "🛡️" },
];

export async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Seed teams
    for (const team of TEAMS) {
      await conn.execute(
        "INSERT IGNORE INTO teams (name, color) VALUES (?, ?)",
        [team.name, team.color]
      );
    }

    // Seed challenges
    for (const ch of CHALLENGES) {
      await conn.execute(
        "INSERT IGNORE INTO challenges (step_number, name, description, module_focus, max_score, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
        [ch.step_number, ch.name, ch.description, ch.module_focus, ch.max_score, ch.sort_order]
      );
    }

    // Seed scoring criteria
    for (const [stepStr, criteria] of Object.entries(SCORING_CRITERIA)) {
      const step = parseInt(stepStr);
      const [chRows] = await conn.execute("SELECT id FROM challenges WHERE step_number = ?", [step]);
      const chId = (chRows as { id: number }[])[0]?.id;
      if (!chId) continue;

      for (let i = 0; i < criteria.length; i++) {
        const c = criteria[i];
        await conn.execute(
          "INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order) VALUES (?, ?, ?, ?, ?)",
          [chId, c.name, c.description, c.max_points, i]
        );
      }
    }

    // Seed awards
    for (const award of AWARDS) {
      await conn.execute(
        "INSERT IGNORE INTO awards (name, description, icon) VALUES (?, ?, ?)",
        [award.name, award.description, award.icon]
      );
    }

    await conn.commit();
    console.log("Seed completed successfully!");
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
