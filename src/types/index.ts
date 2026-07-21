export interface Team {
  id: number;
  name: string;
  color: string | null;
  created_at: string;
}

export interface Challenge {
  id: number;
  step_number: number;
  name: string;
  description: string | null;
  module_focus: string | null;
  max_score: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ScoringCriterion {
  id: number;
  challenge_id: number;
  name: string;
  description: string | null;
  max_points: number;
  sort_order: number;
}

export interface Score {
  id: number;
  challenge_id: number;
  team_id: number;
  criterion_id: number;
  scorer_type: "judge" | "self";
  points: number;
  max_possible: number;
  notes: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface Award {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  awarded_to_team_id: number | null;
  awarded_at: string;
}

export interface Module {
  id: number;
  module_number: number;
  name: string;
  description: string | null;
  step_id: number | null;
  sort_order: number;
}

export interface SubTopic {
  id: number;
  module_id: number;
  name: string;
  description: string | null;
  sort_order: number;
}

export interface Exercise {
  id: number;
  sub_topic_id: number;
  exercise_number: string;
  title: string | null;
  instruction: string;
  expected_query: string | null;
  expected_output: string | null;
  difficulty: "easy" | "medium" | "hard";
  sort_order: number;
}

export interface ExerciseCompletion {
  id: number;
  exercise_id: number;
  team_id: number;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}

export interface ChallengeContent {
  id: number;
  challenge_id: number;
  content_type: "instructions" | "story_hook" | "example_query" | "expected_answer" | "discussion_point";
  title: string | null;
  content: string;
  sort_order: number;
}

export interface LeaderboardEntry {
  rank: number;
  teamId: number;
  teamName: string;
  teamColor: string | null;
  judgeTotal: number;
  selfTotal: number;
  combinedTotal: number;
  scoreCount: number;
}

export interface ScoreWithDetails extends Score {
  team_name: string;
  team_color: string | null;
  challenge_name: string;
  criterion_name: string;
}
