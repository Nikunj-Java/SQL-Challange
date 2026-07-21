-- SQL Story Campaign: Challenge Manager Database Setup
-- Run this file to set up the database:
-- mysql -u root -p < setup.sql

CREATE DATABASE IF NOT EXISTS challenge_manager;
USE challenge_manager;

-- Teams
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges (Steps 0-7)
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

-- Scoring Criteria (per challenge)
CREATE TABLE IF NOT EXISTS scoring_criteria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_points INT NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

-- Scores
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

-- Awards
CREATE TABLE IF NOT EXISTS awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    awarded_to_team_id INT,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (awarded_to_team_id) REFERENCES teams(id)
);

-- Exercise Completions (team tracking)
CREATE TABLE IF NOT EXISTS exercise_completions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    team_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    notes TEXT,
    FOREIGN KEY (team_id) REFERENCES teams(id),
    UNIQUE KEY unique_exercise_team (exercise_id, team_id)
);

-- ============================================
-- SEED DATA
-- ============================================

-- Teams
INSERT IGNORE INTO teams (name, color) VALUES
('Team Alpha', '#EF4444'),
('Team Bravo', '#F97316'),
('Team Charlie', '#EAB308'),
('Team Delta', '#22C55E'),
('Team Echo', '#06B6D4'),
('Team Foxtrot', '#3B82F6'),
('Team Golf', '#8B5CF6'),
('Team Hotel', '#EC4899'),
('Team India', '#14B8A6'),
('Team Juliet', '#F59E0B');

-- Challenges
INSERT IGNORE INTO challenges (step_number, name, description, module_focus, max_score, sort_order) VALUES
(0, 'Diagnostics Quiz', 'Individual 15-minute quiz. 7 questions testing basic SQL knowledge.', 'SELECT/WHERE/ORDER BY/JOIN', 0, 0),
(1, 'Evidence Board', 'Draw relationship map on paper/whiteboard showing how tables connect.', 'Schema relationships', 0, 1),
(2, 'Surveillance', 'Before we fix anything, we must understand what is inside the system.', 'SELECT/WHERE/LIMIT/DISTINCT/ORDER BY', 10, 2),
(3, 'Emergency Data Operations', 'Emergency operations - fix data before the board meeting.', 'INSERT/UPDATE/DELETE', 20, 3),
(4, 'Boardroom KPIs', 'The board wants numbers, not tables.', 'Aggregates/HAVING/ORDER BY', 10, 4),
(5, 'Relationships & Missing Links', 'Connections reveal truth. Maximum investigation.', 'JOINs/LEFT JOINs', 10, 5),
(6, 'Special Functions & Advanced', 'Polish reports and detect anomalies.', 'String/Date/Control Flow/Constraints', 10, 6),
(7, 'Board Meeting Presentation', '2-minute report. What crisis, 2 insights, 1 fix, 1 risk, 1 recommendation.', 'Presentation', 10, 7);

-- Scoring Criteria for Step 2 (Surveillance)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Correct Query', 'SQL query runs correctly and returns expected results', 5, 0
FROM challenges c WHERE c.step_number = 2;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Clear Explanation', 'Team can explain what the query does and why', 3, 1
FROM challenges c WHERE c.step_number = 2;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Storytelling', 'Result presented as narrative insight', 2, 2
FROM challenges c WHERE c.step_number = 2;

-- Scoring Criteria for Step 3 (Emergency Data Ops)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Correctness', 'INSERT/UPDATE/DELETE executes correctly', 5, 0
FROM challenges c WHERE c.step_number = 3;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Safety & Risk Assessment', 'Team identifies risks before executing changes', 5, 1
FROM challenges c WHERE c.step_number = 3;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Verification', 'Team runs SELECT to prove the fix worked', 5, 2
FROM challenges c WHERE c.step_number = 3;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Business Explanation', 'Clear business rationale for the change', 3, 3
FROM challenges c WHERE c.step_number = 3;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'SQL Hygiene', 'Clean aliases, readable queries, proper formatting', 2, 4
FROM challenges c WHERE c.step_number = 3;

-- Scoring Criteria for Step 4 (Boardroom KPIs)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'KPI Quality', '3 meaningful KPIs with SQL backing', 5, 0
FROM challenges c WHERE c.step_number = 4;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Risk Identification', '1 clear business risk from data', 3, 1
FROM challenges c WHERE c.step_number = 4;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Recommendation', '1 actionable recommendation', 2, 2
FROM challenges c WHERE c.step_number = 4;

-- Scoring Criteria for Step 5 (Relationships)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Correct JOIN', 'JOINs execute with proper ON clauses', 5, 0
FROM challenges c WHERE c.step_number = 5;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Cross-examination Q&A', 'Explains why LEFT JOIN vs INNER', 3, 1
FROM challenges c WHERE c.step_number = 5;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Referential Integrity', 'Explains how foreign keys prevent invalid data', 2, 2
FROM challenges c WHERE c.step_number = 5;

-- Scoring Criteria for Step 6 (Special Functions)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Feature Quality', 'Mini product feature works correctly', 5, 0
FROM challenges c WHERE c.step_number = 6;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Creativity', 'Creative use of special functions', 3, 1
FROM challenges c WHERE c.step_number = 6;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Presentation', 'Clear presentation of the feature', 2, 2
FROM challenges c WHERE c.step_number = 6;

-- Scoring Criteria for Step 7 (Board Meeting)
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Crisis Narrative', 'Clear description of crisis investigated', 3, 0
FROM challenges c WHERE c.step_number = 7;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Insight Depth', '2 strong insights from SQL analysis', 3, 1
FROM challenges c WHERE c.step_number = 7;
INSERT IGNORE INTO scoring_criteria (challenge_id, name, description, max_points, sort_order)
SELECT c.id, 'Fix/Risk/Recommendation', '1 fix, 1 risk, 1 recommendation', 4, 2
FROM challenges c WHERE c.step_number = 7;

-- Awards
INSERT IGNORE INTO awards (name, description, icon) VALUES
('Best Data Detective', 'Best JOINs insight - uncovered hidden relationships in the data', '🔍'),
('Best Boardroom Story', 'Best narrative - turned SQL results into compelling business story', '📖'),
('Best SQL Hygiene', 'Clean aliases, readable queries, proper formatting throughout', '✨'),
('Best Risk Awareness', 'Safe updates, rollback planning, constraint discussion', '🛡️');
