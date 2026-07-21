export const SCHEMA_SQL = `
CREATE DATABASE IF NOT EXISTS challenge_manager;
USE challenge_manager;

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    step_number INT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    module_focus VARCHAR(100),
    max_score INT NOT NULL DEFAULT 10,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scoring_criteria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_points INT NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    team_id INT NOT NULL,
    criterion_id INT NOT NULL,
    scorer_type ENUM('judge', 'self') NOT NULL DEFAULT 'judge',
    points DECIMAL(5,1) NOT NULL,
    max_possible DECIMAL(5,1) NOT NULL,
    notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id),
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (criterion_id) REFERENCES scoring_criteria(id),
    UNIQUE KEY unique_criterion_score (team_id, challenge_id, criterion_id, scorer_type)
);

CREATE TABLE IF NOT EXISTS awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    awarded_to_team_id INT,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (awarded_to_team_id) REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS exercise_completions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    team_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    notes TEXT,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),
    FOREIGN KEY (team_id) REFERENCES teams(id),
    UNIQUE KEY unique_exercise_team (exercise_id, team_id)
);
`;
