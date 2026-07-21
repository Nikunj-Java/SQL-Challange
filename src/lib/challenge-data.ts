export interface StepContent {
  stepNumber: number;
  name: string;
  storyHook: string;
  instructions: string[];
  exampleQueries: { description: string; sql: string }[];
  expectedOutput: string;
  scoringRubric: { criterion: string; maxPoints: number; description: string }[];
  outputFormat: string;
  tips: string[];
  quizQuestions?: { question: string; hint: string }[];
}

export const STEPS: StepContent[] = [
  {
    stepNumber: 0,
    name: "Diagnostics Quiz",
    storyHook: "Before we begin our investigation, each team member must demonstrate basic SQL competency.",
    instructions: [
      "This is an individual quiz — no collaboration allowed.",
      "You have 15 minutes to complete 7 questions.",
      "Write your SQL queries on paper or in your personal editor.",
      "Results will be used as baseline assessment, not scored as a team.",
    ],
    exampleQueries: [],
    expectedOutput: "Individual scores for baseline assessment.",
    scoringRubric: [],
    outputFormat: "Individual answers reviewed by facilitator.",
    tips: ["Read each question carefully.", "Test your logic mentally before writing the query."],
    quizQuestions: [
      { question: "Q1 (SELECT/WHERE): Find authors who live in Oakland and have contract = 1.", hint: "Use WHERE with AND" },
      { question: "Q2 (ORDER BY/LIMIT): Show top 3 most expensive titles (title, price).", hint: "ORDER BY price DESC LIMIT 3" },
      { question: "Q3 (DISTINCT): List distinct states where publishers exist.", hint: "SELECT DISTINCT state FROM publishers" },
      { question: "Q4 (GROUP BY/HAVING): Count authors per city, show only cities with more than 2 authors.", hint: "GROUP BY city HAVING COUNT(*) > 2" },
      { question: "Q5 (JOIN basic): List title + publisher name.", hint: "INNER JOIN titles t ON ... publishers p ON t.pub_id = p.pub_id" },
      { question: "Q6 (LEFT JOIN concept): Find authors who have not published any title.", hint: "LEFT JOIN titleauthor ... WHERE ta.au_id IS NULL" },
      { question: "Q7: In one line, explain what your JOIN in Q6 is doing.", hint: "Think about what IS NULL means in a LEFT JOIN" },
    ],
  },
  {
    stepNumber: 1,
    name: "Evidence Board",
    storyHook: "Every good detective starts with a relationship map. How do our database tables connect?",
    instructions: [
      "Draw all 9 tables on a whiteboard or large paper.",
      "Draw lines between tables showing foreign key relationships.",
      "Label each relationship line with the connecting column(s).",
      "Highlight the key path: authors ↔ titleauthor ↔ titles ↔ publishers.",
      "Include: stores ↔ sales ↔ titles, employee ↔ jobs ↔ publishers.",
    ],
    exampleQueries: [],
    expectedOutput: "Visual Evidence Board showing all table relationships.",
    scoringRubric: [],
    outputFormat: "Photo of whiteboard/paper drawing.",
    tips: ["Use different colors for different relationship paths.", "Make sure every table is connected to at least one other table."],
  },
  {
    stepNumber: 2,
    name: "Surveillance",
    storyHook: "Before we fix anything, we must understand what's inside the system. We need to survey the data landscape — list all suspects, flag anomalies, and identify patterns.",
    instructions: [
      "Pick at least one query from each sub-topic below.",
      "Execute the query and capture the results.",
      "Present one query result as a story insight.",
      "Format: 'We discovered ___ and it implies ___.'",
    ],
    exampleQueries: [
      { description: "List all suspects (authors) with full profile", sql: "SELECT * FROM authors;" },
      { description: "Flag premium-priced books needing executive approval", sql: "SELECT title, price FROM titles WHERE price > 50 ORDER BY price DESC;" },
      { description: "Identify HQ-linked publishers", sql: "SELECT * FROM publishers WHERE city = 'New York';" },
      { description: "Find books related to SQL initiative", sql: "SELECT title FROM titles WHERE title LIKE '%Computer%';" },
      { description: "Find unreliable contact records", sql: "SELECT au_lname, au_fname, phone FROM authors WHERE phone = 'UNKNOWN';" },
    ],
    expectedOutput: "Story insight: 'We discovered ___ and it implies ___.'",
    scoringRubric: [
      { criterion: "Correct Query", maxPoints: 5, description: "SQL query runs correctly and returns expected results" },
      { criterion: "Clear Explanation", maxPoints: 3, description: "Team can explain what the query does and why" },
      { criterion: "Storytelling", maxPoints: 2, description: "Result presented as narrative insight" },
    ],
    outputFormat: "One story insight presented verbally with query shown on screen.",
    tips: ["Use column aliases for readability.", "Add ORDER BY to sort results meaningfully.", "LIMIT large result sets."],
  },
  {
    stepNumber: 3,
    name: "Emergency Data Operations",
    storyHook: "Emergency operations — the board meeting is hours away and the data is wrong. We need to fix it fast, but safely. Every change must be verified and reversible.",
    instructions: [
      "Execute at least one INSERT, one UPDATE, and one DELETE.",
      "Before each change, explain the risk.",
      "After each change, run a SELECT to verify.",
      "Discuss rollback strategy for each operation.",
      "Dangerous operation: DELETE authors — discuss why this is risky.",
    ],
    exampleQueries: [
      { description: "New branch opening — insert a new store", sql: "INSERT INTO stores (stor_id, stor_name, stor_address, city, state, zip)\nVALUES ('9000', 'Books Galore', '123 Main St.', 'Anytown', 'NY', '12345');" },
      { description: "Address standardization — change Oakland to San Francisco", sql: "UPDATE authors SET city = 'San Francisco' WHERE city = 'Oakland';" },
      { description: "Renegotiated contract — update title advance", sql: "UPDATE titles SET advance = 10000 WHERE title = 'Secrets of Silicon Valley';" },
      { description: "Fraudulent duplicates cleanup — DELETE authors", sql: "DELETE FROM authors WHERE city = 'Berkeley';" },
    ],
    expectedOutput: "Each change documented: What, Risk, Verification, Rollback plan.",
    scoringRubric: [
      { criterion: "Correctness", maxPoints: 5, description: "INSERT/UPDATE/DELETE executes correctly" },
      { criterion: "Safety & Risk Assessment", maxPoints: 5, description: "Team identifies risks before executing changes" },
      { criterion: "Verification", maxPoints: 5, description: "Team runs SELECT to prove the fix worked" },
      { criterion: "Business Explanation", maxPoints: 3, description: "Clear business rationale for the change" },
      { criterion: "SQL Hygiene", maxPoints: 2, description: "Clean aliases, readable queries, proper formatting" },
    ],
    outputFormat: "Each change documented with What/Risk/Verification/Rollback.",
    tips: ["Always use WHERE clause in UPDATE/DELETE.", "Consider foreign key constraints before DELETE.", "Use transactions if possible.", "Disable safe updates if needed: SET SQL_SAFE_UPDATES = 0;"],
  },
  {
    stepNumber: 4,
    name: "Boardroom KPIs",
    storyHook: "The board wants numbers, not tables. We need to convert raw SQL results into business intelligence — KPIs, risks, and actionable recommendations.",
    instructions: [
      "Run aggregate queries to derive business KPIs.",
      "Identify 3 KPIs from the data.",
      "Identify 1 business risk.",
      "Provide 1 recommendation to leadership.",
      "Present findings with SQL backing.",
    ],
    exampleQueries: [
      { description: "Total active authors", sql: "SELECT COUNT(*) AS total_authors FROM authors;" },
      { description: "Average catalog pricing", sql: "SELECT ROUND(AVG(price), 2) AS avg_price FROM titles;" },
      { description: "Author concentration risk — cities with more than 2 authors", sql: "SELECT city, COUNT(*) AS author_count FROM authors GROUP BY city HAVING COUNT(*) > 2;" },
      { description: "Portfolio mix — titles per type", sql: "SELECT type, COUNT(*) AS title_count FROM titles GROUP BY type ORDER BY title_count DESC;" },
      { description: "Premium categories — max price per type > 15", sql: "SELECT type, MAX(price) AS max_price FROM titles GROUP BY type HAVING MAX(price) > 15;" },
      { description: "International footprint — publishers per country > 1", sql: "SELECT country, COUNT(*) AS pub_count FROM publishers GROUP BY country HAVING COUNT(*) > 1;" },
    ],
    expectedOutput: "3 KPIs, 1 risk, 1 recommendation — all with SQL evidence.",
    scoringRubric: [
      { criterion: "KPI Quality", maxPoints: 5, description: "3 meaningful KPIs with SQL backing" },
      { criterion: "Risk Identification", maxPoints: 3, description: "1 clear business risk from data" },
      { criterion: "Recommendation", maxPoints: 2, description: "1 actionable recommendation" },
    ],
    outputFormat: "Whiteboard/presentation: 3 KPIs, 1 risk, 1 recommendation.",
    tips: ["Use ROUND() for clean numbers.", "HAVING filters groups, WHERE filters rows.", "ORDER BY helps rank results."],
  },
  {
    stepNumber: 5,
    name: "Relationships & Missing Links",
    storyHook: "Connections reveal truth. Who wrote what? Who hasn't published yet? Are there broken links in our data chain? Maximum investigation — sharpen your detective skills.",
    instructions: [
      "Write at least 2 JOIN queries connecting multiple tables.",
      "Find authors who have not published any title (LEFT JOIN).",
      "Find titles with multiple authors.",
      "Cross-examine: Why LEFT JOIN and not INNER?",
      "Discuss: How does referential integrity prevent deletion of referenced rows?",
    ],
    exampleQueries: [
      { description: "Which authors wrote which titles? (multi-table JOIN)", sql: "SELECT a.au_fname, a.au_lname, t.title\nFROM authors a\nINNER JOIN titleauthor ta ON a.au_id = ta.au_id\nINNER JOIN titles t ON ta.title_id = t.title_id;" },
      { description: "Which titles have multiple authors?", sql: "SELECT t.title, COUNT(ta.au_id) AS author_count\nFROM titles t\nINNER JOIN titleauthor ta ON t.title_id = ta.title_id\nGROUP BY t.title_id, t.title\nHAVING COUNT(ta.au_id) > 1;" },
      { description: "Authors without titles (LEFT JOIN)", sql: "SELECT a.au_id, a.au_lname, a.au_fname\nFROM authors a\nLEFT JOIN titleauthor ta ON a.au_id = ta.au_id\nWHERE ta.au_id IS NULL;" },
    ],
    expectedOutput: "JOIN results + explanation of LEFT vs INNER + referential integrity discussion.",
    scoringRubric: [
      { criterion: "Correct JOIN", maxPoints: 5, description: "JOINs execute with proper ON clauses" },
      { criterion: "Cross-examination Q&A", maxPoints: 3, description: "Explains why LEFT JOIN vs INNER" },
      { criterion: "Referential Integrity", maxPoints: 2, description: "Explains how foreign keys prevent invalid data" },
    ],
    outputFormat: "Verbal presentation of JOIN results + Q&A with cross-examining team.",
    tips: ["INNER JOIN only returns matching rows.", "LEFT JOIN returns ALL rows from left table + matches.", "Use table aliases (a, t, p) for readability.", "IS NULL check is key for finding missing relationships."],
  },
  {
    stepNumber: 6,
    name: "Special Functions & Advanced",
    storyHook: "Polish reports and detect anomalies. String functions for formatting, date functions for time analysis, CASE for classification, and NULL handling for data quality.",
    instructions: [
      "Pick one extra challenge and present it as a mini product feature.",
      "Options: Data Quality Check, Forecasting Report, Customer Segmentation.",
      "Use at least 2 special functions (string, date, CASE, or NULL handling).",
      "Present as: 'We built ___'.",
    ],
    exampleQueries: [
      { description: "Address label formatting", sql: "SELECT CONCAT(au_fname, ' ', au_lname) AS full_name,\nCONCAT(address, ', ', city, ', ', state, ' ', zip) AS mailing_label\nFROM authors;" },
      { description: "Description contains 'Computer' (case insensitive) — tag titles for a campaign", sql: "SELECT title FROM titles WHERE LOWER(notes) LIKE '%computer%';" },
      { description: "Phone number format check", sql: "SELECT au_lname, au_fname, phone\nFROM authors\nWHERE phone NOT LIKE '___-___-____';" },
      { description: "CASE: cheap vs expensive classification", sql: "SELECT title, price,\nCASE\n  WHEN price < 10 THEN 'Budget'\n  WHEN price < 20 THEN 'Standard'\n  ELSE 'Premium'\nEND AS price_category\nFROM titles;" },
      { description: "IFNULL for revenue forecasting", sql: "SELECT title, IFNULL(price, 9.99) AS est_price,\nIFNULL(ytd_sales, 1000) AS est_sales,\nIFNULL(price, 9.99) * IFNULL(ytd_sales, 1000) AS est_revenue\nFROM titles;" },
    ],
    expectedOutput: "Mini product feature: Data Quality Check, Forecasting Report, or Customer Segmentation.",
    scoringRubric: [
      { criterion: "Feature Quality", maxPoints: 5, description: "Mini product feature works correctly" },
      { criterion: "Creativity", maxPoints: 3, description: "Creative use of special functions" },
      { criterion: "Presentation", maxPoints: 2, description: "Clear presentation of the feature" },
    ],
    outputFormat: "5-minute demo of mini product feature.",
    tips: ["CONCAT() for string combining.", "DATE_FORMAT() for date formatting.", "CASE for conditional logic.", "IFNULL/COALESCE for NULL handling."],
  },
  {
    stepNumber: 7,
    name: "Board Meeting Presentation",
    storyHook: "This is it — the 2-minute board meeting report. Every word counts. Tell the story of what crisis you investigated, what you found, what you fixed, and what the leadership should do next.",
    instructions: [
      "Deliver a 2-minute presentation following this structure:",
      "1. What crisis we investigated (1-2 sentences)",
      "2. 2 strongest insights (from Steps 2, 4, 5)",
      "3. One fix we applied (from Step 3)",
      "4. One risk (NULLs, missing records, referential integrity)",
      "5. Recommendation to leadership (1 actionable sentence)",
    ],
    exampleQueries: [],
    expectedOutput: "2-minute verbal presentation following the 5-part structure.",
    scoringRubric: [
      { criterion: "Crisis Narrative", maxPoints: 3, description: "Clear description of crisis investigated" },
      { criterion: "Insight Depth", maxPoints: 3, description: "2 strong insights from SQL analysis" },
      { criterion: "Fix/Risk/Recommendation", maxPoints: 4, description: "1 fix, 1 risk, 1 recommendation" },
    ],
    outputFormat: "2-minute verbal presentation.",
    tips: ["Start with the crisis hook.", "Use specific numbers from your SQL results.", "End with a clear, actionable recommendation.", "Practice staying under 2 minutes."],
  },
];

export function getStepContent(stepNumber: number): StepContent | undefined {
  return STEPS.find((s) => s.stepNumber === stepNumber);
}
