import { query, queryOne } from "./index";
import type { LeaderboardEntry, ScoreWithDetails } from "@/types";

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const rows = await query<LeaderboardEntry[]>(
    `SELECT
      t.id as teamId,
      t.name as teamName,
      t.color as teamColor,
      COALESCE(SUM(CASE WHEN s.scorer_type = 'judge' THEN s.points ELSE 0 END), 0) as judgeTotal,
      COALESCE(SUM(CASE WHEN s.scorer_type = 'self' THEN s.points ELSE 0 END), 0) as selfTotal,
      COALESCE(SUM(s.points), 0) as combinedTotal,
      COUNT(s.id) as scoreCount
    FROM teams t
    LEFT JOIN scores s ON t.id = s.team_id
    GROUP BY t.id, t.name, t.color
    ORDER BY combinedTotal DESC`
  );
  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

export async function getTeamScores(teamId: number): Promise<ScoreWithDetails[]> {
  return query<ScoreWithDetails[]>(
    `SELECT s.*, t.name as team_name, t.color as team_color,
      c.name as challenge_name, sc.name as criterion_name
    FROM scores s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    JOIN scoring_criteria sc ON s.criterion_id = sc.id
    WHERE s.team_id = ?
    ORDER BY c.step_number, sc.sort_order`,
    [teamId]
  );
}

export async function getChallengeScores(challengeId: number): Promise<ScoreWithDetails[]> {
  return query<ScoreWithDetails[]>(
    `SELECT s.*, t.name as team_name, t.color as team_color,
      c.name as challenge_name, sc.name as criterion_name
    FROM scores s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    JOIN scoring_criteria sc ON s.criterion_id = sc.id
    WHERE s.challenge_id = ?
    ORDER BY t.name, sc.sort_order`,
    [challengeId]
  );
}

export async function getDashboardStats() {
  const [teams] = await query<{ count: number }[]>("SELECT COUNT(*) as count FROM teams");
  const [scores] = await query<{ count: number }[]>("SELECT COUNT(*) as count FROM scores");
  const [challenges] = await query<{ count: number }[]>("SELECT COUNT(*) as count FROM challenges WHERE is_active = TRUE");
  const leader = await queryOne<{ teamName: string; combinedTotal: number }>(
    `SELECT t.name as teamName, COALESCE(SUM(s.points), 0) as combinedTotal
     FROM teams t LEFT JOIN scores s ON t.id = s.team_id
     GROUP BY t.id, t.name ORDER BY combinedTotal DESC LIMIT 1`
  );

  return {
    totalTeams: teams.count,
    totalScores: scores.count,
    activeChallenges: challenges.count,
    currentLeader: leader?.teamName || "No scores yet",
    leaderScore: leader?.combinedTotal || 0,
  };
}

export async function getRecentScores(limit = 10) {
  return query<ScoreWithDetails[]>(
    `SELECT s.*, t.name as team_name, t.color as team_color,
      c.name as challenge_name, sc.name as criterion_name
    FROM scores s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    JOIN scoring_criteria sc ON s.criterion_id = sc.id
    ORDER BY s.submitted_at DESC
    LIMIT ?`,
    [limit]
  );
}
