import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { challengeId, teamId, criterionName, scorerType, points, maxPossible, notes } = body;

    if (!challengeId || !teamId || !criterionName || points === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const conn = await pool.getConnection();
    try {
      // Get criterion ID
      const [criterionRows] = await conn.execute(
        "SELECT id FROM scoring_criteria WHERE challenge_id = ? AND name = ?",
        [challengeId, criterionName]
      );
      const criterion = (criterionRows as { id: number }[])[0];
      if (!criterion) {
        return NextResponse.json({ error: "Criterion not found" }, { status: 404 });
      }

      // Upsert score
      await conn.execute(
        `INSERT INTO scores (challenge_id, team_id, criterion_id, scorer_type, points, max_possible, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE points = VALUES(points), max_possible = VALUES(max_possible), notes = VALUES(notes), updated_at = CURRENT_TIMESTAMP`,
        [challengeId, teamId, criterion.id, scorerType, points, maxPossible, notes || ""]
      );

      return NextResponse.json({ success: true });
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Score submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute(
        `SELECT s.*, t.name as team_name, t.color as team_color,
          c.name as challenge_name, sc.name as criterion_name
        FROM scores s
        JOIN teams t ON s.team_id = t.id
        JOIN challenges c ON s.challenge_id = c.id
        JOIN scoring_criteria sc ON s.criterion_id = sc.id
        ORDER BY s.submitted_at DESC`
      );
      return NextResponse.json(rows);
    } finally {
      conn.release();
    }
  } catch {
    return NextResponse.json([]);
  }
}
