import { Tutorial } from "@/types";

export const TUTORIALS: Tutorial[] = [
  {
    stepId: 0,
    title: "SELECT Basics",
    subtitle: "Retrieve data from tables",
    introduction:
      "Every SQL journey starts with SELECT — the command that retrieves data from your database. Think of a database table as a spreadsheet: SELECT lets you pick which rows and columns you want to see. In this tutorial you will learn how to pull specific columns, filter rows with WHERE, and sort your results.",
    sections: [
      {
        concept: "What is SQL?",
        explanation:
          "SQL (Structured Query Language) is the standard language for talking to relational databases. You write a SQL statement, send it to the database, and the database returns the answer. The most common operation is reading data, which uses the SELECT statement.",
        syntax: `-- Basic SELECT syntax\nSELECT column1, column2, ...\nFROM table_name\nWHERE condition\nORDER BY column ASC|DESC\nLIMIT number;`,
        exampleTitle: "List all authors in the database",
        exampleInput:
          "The 'authors' table has columns: au_id, au_lname, au_fname, phone, address, city, state, zip, contract",
        exampleQuery: `SELECT au_fname, au_lname, city\nFROM authors;`,
        exampleOutput:
          "+-----------+-----------+------------+\n| au_fname  | au_lname  | city       |\n+-----------+-----------+------------+\n| Johnson   | White     | Menlo Park |\n| Marjorie  | Green     | Oakland    |\n| Cheryl    | Carson    | Berkeley   |\n+-----------+-----------+------------+",
        tryIt: {
          question:
            "Write a query that returns the title and price of every book in the titles table.",
          hint: "Use SELECT title, price FROM titles;",
          solution: `SELECT title, price\nFROM titles;`,
        },
      },
      {
        concept: "Filtering with WHERE",
        explanation:
          "The WHERE clause filters rows. Only rows that match the condition are returned. You can compare columns to values using =, <>, <, >, <=, >=. You can combine conditions with AND and OR.",
        syntax: `SELECT column1, column2\nFROM table_name\nWHERE column1 = 'value'\n  AND column2 > 10;`,
        exampleTitle: "Find authors who live in Oakland",
        exampleInput:
          "The 'authors' table has columns: au_id, au_lname, au_fname, city, state",
        exampleQuery: `SELECT au_fname, au_lname, city\nFROM authors\nWHERE city = 'Oakland';`,
        exampleOutput:
          "+-----------+-----------+----------+\n| au_fname  | au_lname  | city     |\n+-----------+-----------+----------+\n| Marjorie  | Green     | Oakland  |\n| Michael   | O'Leary   | Oakland  |\n+-----------+-----------+----------+",
        tryIt: {
          question:
            "Find all titles that cost more than $20. Return the title and price.",
          hint: "Use WHERE price > 20",
          solution: `SELECT title, price\nFROM titles\nWHERE price > 20;`,
        },
      },
      {
        concept: "Sorting with ORDER BY and LIMIT",
        explanation:
          "ORDER BY sorts your results. Use ASC for ascending (smallest first, the default) or DESC for descending (largest first). LIMIT restricts how many rows are returned — useful when you only need the top N results.",
        syntax: `SELECT column1, column2\nFROM table_name\nORDER BY column DESC\nLIMIT 5;`,
        exampleTitle: "Find the 3 most expensive books",
        exampleInput: "The 'titles' table has columns: title, price",
        exampleQuery: `SELECT title, price\nFROM titles\nORDER BY price DESC\nLIMIT 3;`,
        exampleOutput:
          "+---------------------------------------+-------+\n| title                                 | price |\n+---------------------------------------+-------+\n| Secrets of Silicon Valley             | 20.00 |\n| Computer Phobic AND Non-Phobic Ind... | 21.59 |\n| Emotional Security: A New Algorithm   | 7.99  |\n+---------------------------------------+-------+",
        tryIt: {
          question:
            "List the 5 cheapest titles. Show title and price, sorted from cheapest to most expensive.",
          hint: "Use ORDER BY price ASC LIMIT 5",
          solution: `SELECT title, price\nFROM titles\nORDER BY price ASC\nLIMIT 5;`,
        },
      },
    ],
    summary:
      "You now know how to SELECT columns FROM a table, filter rows with WHERE, sort results with ORDER BY, and limit output with LIMIT. These four clauses form the foundation of every SQL query you will ever write.",
  },
  {
    stepId: 1,
    title: "Filtering Data",
    subtitle: "Master operators and pattern matching",
    introduction:
      "Real-world questions rarely need all the data. You need to filter — find books in a price range, authors whose names start with 'M', or stores in specific states. This tutorial covers the comparison operators, LIKE for pattern matching, IN for sets, and BETWEEN for ranges.",
    sections: [
      {
        concept: "Comparison Operators",
        explanation:
          "SQL supports standard comparison operators: = (equal), <> (not equal), < (less than), > (greater than), <= (less or equal), >= (greater or equal). These work on numbers, dates, and text.",
        syntax: `SELECT column1, column2\nFROM table_name\nWHERE column operator value;`,
        exampleTitle: "Find titles priced between $10 and $20",
        exampleInput: "The 'titles' table has columns: title, price",
        exampleQuery: `SELECT title, price\nFROM titles\nWHERE price >= 10 AND price <= 20\nORDER BY price;`,
        exampleOutput:
          "+---------------------------------------+-------+\n| title                                 | price |\n+---------------------------------------+-------+\n| The Gourmet Microwave                 | 2.99  |\n| Cooking with Computers                | 11.95 |\n| Straight Talking                      | 19.99 |\n+---------------------------------------+-------+",
        tryIt: {
          question:
            "Find all authors who live in California (state = 'CA') and have a contract (contract = 1).",
          hint: "Use WHERE state = 'CA' AND contract = 1",
          solution: `SELECT au_fname, au_lname, state\nFROM authors\nWHERE state = 'CA' AND contract = 1;`,
        },
      },
      {
        concept: "Pattern Matching with LIKE",
        explanation:
          "LIKE lets you search for patterns in text. Use % to match any number of characters (including none) and _ to match exactly one character. For example, '%SQL%' matches any text containing 'SQL', and 'M__' matches any three-letter word starting with M.",
        syntax: `SELECT column\nFROM table_name\nWHERE column LIKE 'pattern%';`,
        exampleTitle: "Find authors whose last name starts with 'G'",
        exampleInput: "The 'authors' table has columns: au_lname, au_fname",
        exampleQuery: `SELECT au_lname, au_fname\nFROM authors\nWHERE au_lname LIKE 'G%';`,
        exampleOutput:
          "+-----------+-----------+\n| au_lname  | au_fname  |\n+-----------+-----------+\n| Green     | Marjorie  |\n| Gringlesby | Burt     |\n+-----------+-----------+",
        tryIt: {
          question:
            "Find all titles that contain the word 'Computer' anywhere in the title.",
          hint: "Use LIKE '%Computer%'",
          solution: `SELECT title\nFROM titles\nWHERE title LIKE '%Computer%';`,
        },
      },
      {
        concept: "IN and BETWEEN",
        explanation:
          "IN checks if a value matches any value in a list. BETWEEN checks if a value falls within a range (inclusive on both ends). Both make your queries shorter and easier to read.",
        syntax: `-- IN: match any value in a list\nSELECT * FROM table WHERE column IN ('a', 'b', 'c');\n\n-- BETWEEN: match a range\nSELECT * FROM table WHERE column BETWEEN 10 AND 20;`,
        exampleTitle: "Find publishers in specific cities",
        exampleInput:
          "The 'publishers' table has columns: pub_id, pub_name, city, state, country",
        exampleQuery: `SELECT pub_name, city, state\nFROM publishers\nWHERE city IN ('Boston', 'Chicago', 'New York');`,
        exampleOutput:
          "+-----------------+-----------+-------+\n| pub_name        | city      | state |\n+-----------------+-----------+-------+\n| Algodata Infosystems | Berkeley | CA   |\n| Binnet & Hardley | Washington| DC    |\n+-----------------+-----------+-------+",
        tryIt: {
          question:
            "Find all titles priced between $5 and $15. Show title, price, and type.",
          hint: "Use BETWEEN 5 AND 15",
          solution: `SELECT title, price, type\nFROM titles\nWHERE price BETWEEN 5 AND 15;`,
        },
      },
    ],
    summary:
      "You can now filter data with comparison operators, pattern-match with LIKE, check sets with IN, and select ranges with BETWEEN. These tools let you pinpoint exactly the rows you need from any table.",
  },
  {
    stepId: 2,
    title: "Joining Tables",
    subtitle: "Connect related data across tables",
    introduction:
      "In a well-designed database, information is split across multiple tables to avoid duplication. JOINs let you combine rows from two or more tables based on a related column. This is the most powerful feature of relational databases — and the most important concept for this challenge.",
    sections: [
      {
        concept: "Why Join Tables?",
        explanation:
          "Imagine the 'titles' table stores book information and the 'publishers' table stores publisher information. Each title has a pub_id that links to a publisher. Instead of storing the publisher name in every title row (wasteful!), you store just the ID and JOIN when you need the name. This is called normalization.",
        syntax: `SELECT table1.column, table2.column\nFROM table1\nINNER JOIN table2 ON table1.foreign_key = table2.primary_key;`,
        exampleTitle: "List each title with its publisher name",
        exampleInput:
          "titles table: title_id, title, pub_id | publishers table: pub_id, pub_name",
        exampleQuery: `SELECT t.title, p.pub_name\nFROM titles t\nINNER JOIN publishers p ON t.pub_id = p.pub_id;`,
        exampleOutput:
          "+---------------------------------------+-----------------+\n| title                                 | pub_name        |\n+---------------------------------------+-----------------+\n| The Busy Executive's Database Guide   | Algodata Info.. |\n| Cooking with Computers                | Algodata Info.. |\n| You Can Combat Computer Stress!       | New Moon Books  |\n+---------------------------------------+-----------------+",
        tryIt: {
          question:
            "List each author's first name, last name, and the title of every book they wrote. (Hint: you need to join three tables: authors, titleauthor, titles.)",
          hint: "Join authors -> titleauthor -> titles using au_id and title_id",
          solution: `SELECT a.au_fname, a.au_lname, t.title\nFROM authors a\nINNER JOIN titleauthor ta ON a.au_id = ta.au_id\nINNER JOIN titles t ON ta.title_id = t.title_id;`,
        },
      },
      {
        concept: "INNER JOIN vs LEFT JOIN",
        explanation:
          "INNER JOIN returns only rows that have matches in both tables. LEFT JOIN returns ALL rows from the left table (the first one), and fills in NULL for columns from the right table when there is no match. Use LEFT JOIN when you want to find things that are missing.",
        syntax: `-- INNER JOIN: only matching rows\nSELECT a.col, b.col\nFROM table_a a INNER JOIN table_b b ON a.id = b.a_id;\n\n-- LEFT JOIN: all rows from left + matches\nSELECT a.col, b.col\nFROM table_a a LEFT JOIN table_b b ON a.id = b.a_id;`,
        exampleTitle: "Find authors who have NOT written any books",
        exampleInput:
          "authors table: au_id | titleauthor table: au_id, title_id",
        exampleQuery: `SELECT a.au_id, a.au_lname, a.au_fname\nFROM authors a\nLEFT JOIN titleauthor ta ON a.au_id = ta.au_id\nWHERE ta.au_id IS NULL;`,
        exampleOutput:
          "+-------+-----------+-----------+\n| au_id | au_lname  | au_fname  |\n+-------+-----------+-----------+\n| 807   | Smith     | Meander   |\n+-------+-----------+-----------+",
        tryIt: {
          question:
            "Find all publishers that have NOT published any title. Show publisher name and city.",
          hint: "LEFT JOIN publishers to titles, then WHERE titles.title_id IS NULL",
          solution: `SELECT p.pub_name, p.city\nFROM publishers p\nLEFT JOIN titles t ON p.pub_id = t.pub_id\nWHERE t.title_id IS NULL;`,
        },
      },
      {
        concept: "Table Aliases",
        explanation:
          "Aliases are short nicknames for tables. They make queries shorter and more readable, especially when joining many tables. Write the alias right after the table name and use it throughout the query.",
        syntax: `-- Without alias\nSELECT authors.au_lname, titles.title\nFROM authors\nINNER JOIN titleauthor ON authors.au_id = titleauthor.au_id\n\n-- With alias (much cleaner!)\nSELECT a.au_lname, t.title\nFROM authors a\nINNER JOIN titleauthor ta ON a.au_id = ta.au_id`,
        exampleTitle: "Clean multi-table join with aliases",
        exampleInput: "Using aliases for readability",
        exampleQuery: `SELECT a.au_fname, a.au_lname, t.title, p.pub_name\nFROM authors a\nINNER JOIN titleauthor ta ON a.au_id = ta.au_id\nINNER JOIN titles t ON ta.title_id = t.title_id\nINNER JOIN publishers p ON t.pub_id = p.pub_id\nORDER BY a.au_lname;`,
        exampleOutput:
          "+----------+---------+---------------------------------------+------------------+\n| au_fname | au_lname| title                                 | pub_name         |\n+----------+---------+---------------------------------------+------------------+\n| Michael  | Bennet  | The Busy Executive's Database Guide   | Algodata Infosys |\n| Abraham  | Bennet  | The Psychology of Computer Cooking    | New Moon Books   |\n+----------+---------+---------------------------------------+------------------+",
        tryIt: {
          question:
            "List all stores and the titles they have sold, including the quantity. Use aliases.",
          hint: "Join stores -> sales -> titles",
          solution: `SELECT s.stor_name, t.title, sa.qty\nFROM stores s\nINNER JOIN sales sa ON s.stor_id = sa.stor_id\nINNER JOIN titles t ON sa.title_id = t.title_id;`,
        },
      },
    ],
    summary:
      "JOINs are the heart of relational databases. INNER JOIN finds matches, LEFT JOIN finds missing data, and table aliases keep your queries readable. Practice these patterns and you can answer almost any question across your database.",
  },
  {
    stepId: 3,
    title: "Modifying Data",
    subtitle: "INSERT, UPDATE, and DELETE safely",
    introduction:
      "So far you have only read data. Now it is time to make changes. INSERT adds new rows, UPDATE modifies existing rows, and DELETE removes rows. These are powerful operations — always think about what you are changing before you run them!",
    sections: [
      {
        concept: "INSERT — Adding New Rows",
        explanation:
          "INSERT INTO adds a new row to a table. You specify the columns and the values. Make sure the values match the column types (text in quotes, numbers without quotes) and respect any constraints (like NOT NULL or UNIQUE).",
        syntax: `INSERT INTO table_name (column1, column2, column3)\nVALUES ('value1', 'value2', 'value3);`,
        exampleTitle: "Add a new store to the stores table",
        exampleInput:
          "stores table columns: stor_id, stor_name, stor_address, city, state, zip",
        exampleQuery: `INSERT INTO stores (stor_id, stor_name, stor_address, city, state, zip)\nVALUES ('9000', 'Books Galore', '123 Main St.', 'Anytown', 'NY', '12345');`,
        exampleOutput:
          "Query OK, 1 row affected (0.01 sec)",
        tryIt: {
          question:
            "Insert a new author: au_id = '999-99-9999', au_lname = 'Test', au_fname = 'New', phone = '408 555-0100', address = '123 Test Ave', city = 'San Jose', state = 'CA', zip = '95123', contract = 1",
          hint: "Use INSERT INTO authors (...) VALUES (...)",
          solution: `INSERT INTO authors (au_id, au_lname, au_fname, phone, address, city, state, zip, contract)\nVALUES ('999-99-9999', 'Test', 'New', '408 555-0100', '123 Test Ave', 'San Jose', 'CA', '95123', 1);`,
        },
      },
      {
        concept: "UPDATE — Changing Existing Rows",
        explanation:
          "UPDATE changes values in existing rows. The WHERE clause is critical — without it, EVERY row in the table gets updated. Always test your WHERE clause with a SELECT first to make sure you are changing exactly the rows you intend.",
        syntax: `UPDATE table_name\nSET column1 = 'new_value', column2 = 'new_value'\nWHERE condition;`,
        exampleTitle: "Fix a city name (standardize Oakland to San Francisco)",
        exampleInput: "authors table — update city for authors in Oakland",
        exampleQuery: `UPDATE authors\nSET city = 'San Francisco'\nWHERE city = 'Oakland';`,
        exampleOutput:
          "Query OK, 2 rows affected (0.01 sec)",
        tryIt: {
          question:
            "Increase the price of all titles in the 'business' type by 10%. Show the UPDATE statement.",
          hint: "Use SET price = price * 1.10 WHERE type = 'business'",
          solution: `UPDATE titles\nSET price = price * 1.10\nWHERE type = 'business';`,
        },
      },
      {
        concept: "DELETE — Removing Rows",
        explanation:
          "DELETE removes rows from a table. Like UPDATE, the WHERE clause is critical. Without it, ALL rows are deleted. Consider foreign key constraints — if other tables reference the rows you are deleting, the database may block the operation.",
        syntax: `DELETE FROM table_name\nWHERE condition;`,
        exampleTitle: "Remove a test store that was added by mistake",
        exampleInput: "stores table — delete the store with stor_id = '9000'",
        exampleQuery: `DELETE FROM stores\nWHERE stor_id = '9000';`,
        exampleOutput:
          "Query OK, 1 row affected (0.01 sec)",
        tryIt: {
          question:
            "Write a DELETE statement to remove the test author you inserted earlier (au_id = '999-99-9999').",
          hint: "Use DELETE FROM authors WHERE au_id = '999-99-9999'",
          solution: `DELETE FROM authors\nWHERE au_id = '999-99-9999';`,
        },
      },
    ],
    summary:
      "INSERT adds rows, UPDATE changes rows, and DELETE removes rows. Always use a WHERE clause with UPDATE and DELETE. Always verify your changes with a SELECT afterward. Consider running changes inside a transaction so you can rollback if something goes wrong.",
  },
  {
    stepId: 4,
    title: "Aggregate Functions & Grouping",
    subtitle: "Summarize data with COUNT, SUM, AVG",
    introduction:
      "Aggregate functions let you crunch numbers across many rows to produce a single summary. COUNT tells you how many rows, SUM adds up values, AVG computes averages, and MIN/MAX find extremes. GROUP BY splits your data into groups so you can aggregate within each group independently.",
    sections: [
      {
        concept: "COUNT, SUM, AVG, MIN, MAX",
        explanation:
          "These five aggregate functions are the building blocks of data analysis. COUNT(*) counts all rows, COUNT(column) counts non-NULL values. SUM adds numeric values. AVG computes the average. MIN and MAX find the smallest and largest values.",
        syntax: `SELECT\n  COUNT(*) AS total_rows,\n  COUNT(column) AS non_null_count,\n  SUM(column) AS total,\n  AVG(column) AS average,\n  MIN(column) AS minimum,\n  MAX(column) AS maximum\nFROM table_name;`,
        exampleTitle: "Get a summary of the titles table",
        exampleInput: "titles table with columns: title_id, title, price, ytd_sales",
        exampleQuery: `SELECT\n  COUNT(*) AS total_titles,\n  COUNT(price) AS titles_with_price,\n  ROUND(AVG(price), 2) AS avg_price,\n  MIN(price) AS min_price,\n  MAX(price) AS max_price\nFROM titles;`,
        exampleOutput:
          "+--------------+-------------------+-----------+-----------+-----------+\n| total_titles | titles_with_price | avg_price | min_price | max_price |\n+--------------+-------------------+-----------+-----------+-----------+\n|           18 |                16 |     14.48 |      2.99 |     21.59 |\n+--------------+-------------------+-----------+-----------+-----------+",
        tryIt: {
          question:
            "How many authors are there? How many live in California? Use COUNT with WHERE.",
          hint: "COUNT(*) for total, COUNT(*) WHERE state = 'CA' for California",
          solution: `SELECT COUNT(*) AS total_authors FROM authors;\n\nSELECT COUNT(*) AS california_authors\nFROM authors\nWHERE state = 'CA';`,
        },
      },
      {
        concept: "GROUP BY",
        explanation:
          "GROUP BY splits rows into groups based on column values, then applies aggregate functions to each group separately. For example, GROUP BY city gives you one summary row per city. Without GROUP BY, the aggregate function applies to ALL rows as a single group.",
        syntax: `SELECT column, AGG_FUNCTION(other_column)\nFROM table_name\nGROUP BY column;`,
        exampleTitle: "Count authors in each city",
        exampleInput: "authors table with columns: au_lname, city",
        exampleQuery: `SELECT city, COUNT(*) AS author_count\nFROM authors\nGROUP BY city\nORDER BY author_count DESC;`,
        exampleOutput:
          "+------------+--------------+\n| city       | author_count |\n+------------+--------------+\n| Berkeley   |            3 |\n| Oakland    |            2 |\n| Menlo Park |            1 |\n+------------+--------------+",
        tryIt: {
          question:
            "How many titles are there for each book type? Show type and count, sorted by count descending.",
          hint: "GROUP BY type, COUNT(*)",
          solution: `SELECT type, COUNT(*) AS title_count\nFROM titles\nGROUP BY type\nORDER BY title_count DESC;`,
        },
      },
      {
        concept: "HAVING — Filtering Groups",
        explanation:
          "WHERE filters individual rows before grouping. HAVING filters groups after aggregation. If you want to find cities with more than 2 authors, you must GROUP BY city first, then use HAVING COUNT(*) > 2. You cannot use HAVING without GROUP BY.",
        syntax: `SELECT column, AGG_FUNCTION(other_column)\nFROM table_name\nGROUP BY column\nHAVING AGG_FUNCTION(other_column) condition;`,
        exampleTitle: "Find cities with more than 2 authors",
        exampleInput: "authors table grouped by city",
        exampleQuery: `SELECT city, COUNT(*) AS author_count\nFROM authors\nGROUP BY city\nHAVING COUNT(*) > 2;`,
        exampleOutput:
          "+----------+--------------+\n| city     | author_count |\n+----------+--------------+\n| Berkeley |            3 |\n+----------+--------------+",
        tryIt: {
          question:
            "Find all book types where the average price is greater than $15. Show type and average price.",
          hint: "GROUP BY type HAVING AVG(price) > 15",
          solution: `SELECT type, ROUND(AVG(price), 2) AS avg_price\nFROM titles\nGROUP BY type\nHAVING AVG(price) > 15;`,
        },
      },
    ],
    summary:
      "Aggregate functions (COUNT, SUM, AVG, MIN, MAX) summarize data. GROUP BY splits data into groups for per-group aggregation. HAVING filters groups after aggregation. Together they turn raw data into business intelligence — KPIs, risks, and actionable insights.",
  },
  {
    stepId: 5,
    title: "Advanced Queries",
    subtitle: "UNION, CASE, and complex multi-table analysis",
    introduction:
      "You know the basics — now it is time for advanced techniques. UNION combines results from multiple queries. CASE adds conditional logic inside SQL. And complex multi-table JOINs let you answer sophisticated business questions. These skills will set you apart.",
    sections: [
      {
        concept: "UNION — Combining Query Results",
        explanation:
          "UNION stacks the results of two or more SELECT statements on top of each other. Both queries must return the same number of columns with compatible data types. UNION removes duplicates; UNION ALL keeps them (faster).",
        syntax: `SELECT column1, column2 FROM table1\nUNION\nSELECT column1, column2 FROM table2;`,
        exampleTitle: "List all cities that appear in authors OR publishers",
        exampleInput: "authors table has city, publishers table has city",
        exampleQuery: `SELECT city, 'Author' AS source\nFROM authors\nUNION\nSELECT city, 'Publisher' AS source\nFROM publishers\nORDER BY city;`,
        exampleOutput:
          "+------------+-----------+\n| city       | source    |\n+------------+-----------+\n| Berkeley   | Author    |\n| Boston     | Publisher |\n| Chicago    | Publisher |\n| Menlo Park | Author    |\n| Oakland    | Author    |\n+------------+-----------+",
        tryIt: {
          question:
            "List all unique states that appear in authors OR publishers. Show state and the source table.",
          hint: "SELECT state, 'Author' AS source FROM authors UNION SELECT state, 'Publisher' AS source FROM publishers",
          solution: `SELECT state, 'Author' AS source\nFROM authors\nUNION\nSELECT state, 'Publisher' AS source\nFROM publishers\nORDER BY state;`,
        },
      },
      {
        concept: "CASE — Conditional Logic",
        explanation:
          "CASE works like an if-else statement inside SQL. It evaluates conditions in order and returns the first match. Use it to categorize data, create calculated columns, or transform values on the fly.",
        syntax: `SELECT column,\n  CASE\n    WHEN condition1 THEN 'result1'\n    WHEN condition2 THEN 'result2'\n    ELSE 'default'\n  END AS alias\nFROM table_name;`,
        exampleTitle: "Classify books by price category",
        exampleInput: "titles table with title, price",
        exampleQuery: `SELECT title, price,\n  CASE\n    WHEN price < 10 THEN 'Budget'\n    WHEN price < 20 THEN 'Standard'\n    ELSE 'Premium'\n  END AS price_category\nFROM titles\nORDER BY price;`,
        exampleOutput:
          "+---------------------------------------+-------+----------------+\n| title                                 | price | price_category |\n+---------------------------------------+-------+----------------+\n| The Gourmet Microwave                 |  2.99 | Budget         |\n| You Can Combat Computer Stress!       |  2.99 | Budget         |\n| Cooking with Computers                | 11.95 | Standard       |\n| Secrets of Silicon Valley             | 20.00 | Premium        |\n+---------------------------------------+-------+----------------+",
        tryIt: {
          question:
            "Classify each author as 'Active' if contract = 1, or 'Inactive' if contract = 0. Show full name and status.",
          hint: "Use CASE WHEN contract = 1 THEN 'Active' ELSE 'Inactive' END",
          solution: `SELECT au_fname, au_lname,\n  CASE\n    WHEN contract = 1 THEN 'Active'\n    ELSE 'Inactive'\n  END AS status\nFROM authors;`,
        },
      },
      {
        concept: "Multi-Table JOIN Analysis",
        explanation:
          "Real business questions often require joining 3 or more tables. The key is to follow the foreign key chain: start with the main table, JOIN each related table one at a time using the correct ON clause. Always use aliases to keep things readable.",
        syntax: `SELECT a.col, b.col, c.col\nFROM table_a a\nINNER JOIN table_b b ON a.id = b.a_id\nINNER JOIN table_c c ON b.id = c.b_id\nWHERE condition\nGROUP BY a.col\nHAVING agg_condition;`,
        exampleTitle: "Which authors wrote which titles, and who published them?",
        exampleInput:
          "authors -> titleauthor -> titles -> publishers (4-table JOIN)",
        exampleQuery: `SELECT a.au_fname, a.au_lname, t.title, p.pub_name\nFROM authors a\nINNER JOIN titleauthor ta ON a.au_id = ta.au_id\nINNER JOIN titles t ON ta.title_id = t.title_id\nINNER JOIN publishers p ON t.pub_id = p.pub_id\nORDER BY a.au_lname, t.title;`,
        exampleOutput:
          "+----------+---------+---------------------------------------+------------------+\n| au_fname | au_lname| title                                 | pub_name         |\n+----------+---------+---------------------------------------+------------------+\n| Abraham  | Bennet  | The Psychology of Computer Cooking    | New Moon Books   |\n| Michael  | Bennet  | The Busy Executive's Database Guide   | Algodata Infosys |\n+----------+---------+---------------------------------------+------------------+",
        tryIt: {
          question:
            "Find the total number of books sold (SUM of qty) per publisher. Show publisher name and total quantity.",
          hint: "Join publishers -> titles -> sales, then GROUP BY pub_name",
          solution: `SELECT p.pub_name, SUM(sa.qty) AS total_sold\nFROM publishers p\nINNER JOIN titles t ON p.pub_id = t.pub_id\nINNER JOIN sales sa ON t.title_id = sa.title_id\nGROUP BY p.pub_name\nORDER BY total_sold DESC;`,
        },
      },
    ],
    summary:
      "UNION combines query results, CASE adds conditional logic, and multi-table JOINs enable complex analysis. These advanced techniques let you answer the hardest business questions your data can throw at you.",
  },
  {
    stepId: 6,
    title: "Special Functions",
    subtitle: "String, date, and NULL handling",
    introduction:
      "SQL has built-in functions for formatting text, working with dates, and handling NULL values. These functions polish your reports, detect data quality issues, and make your output presentation-ready.",
    sections: [
      {
        concept: "String Functions",
        explanation:
          "String functions manipulate text. CONCAT joins strings together. UPPER and LOWER change case. LENGTH counts characters. SUBSTRING extracts parts of a string. TRIM removes leading/trailing spaces. These are essential for formatting reports and cleaning data.",
        syntax: `-- Combine strings\nSELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table;\n\n-- Change case\nSELECT UPPER(city), LOWER(title) FROM table;\n\n-- Find length\nSELECT LENGTH(title) AS title_length FROM table;\n\n-- Extract substring\nSELECT SUBSTRING(phone, 1, 3) AS area_code FROM table;`,
        exampleTitle: "Format author mailing labels",
        exampleInput:
          "authors table: au_fname, au_lname, address, city, state, zip",
        exampleQuery: `SELECT CONCAT(au_fname, ' ', au_lname) AS full_name,\n       CONCAT(address, ', ', city, ', ', state, ' ', zip) AS mailing_label\nFROM authors;`,
        exampleOutput:
          "+----------------+--------------------------------------+\n| full_name      | mailing_label                       |\n+----------------+--------------------------------------+\n| Johnson White  | 10932 Bigge Rd., Menlo Park, CA 94025|\n| Marjorie Green  | 305 Cleaver St., Oakland, CA 94618   |\n+----------------+--------------------------------------+",
        tryIt: {
          question:
            "Create a 'display name' for each author that shows last name in uppercase, followed by a comma, then first name. Example: 'WHITE, Johnson'",
          hint: "Use CONCAT(UPPER(au_lname), ', ', au_fname)",
          solution: `SELECT CONCAT(UPPER(au_lname), ', ', au_fname) AS display_name\nFROM authors;`,
        },
      },
      {
        concept: "CASE for Classification",
        explanation:
          "CASE is one of the most versatile SQL functions. It works like an if-else chain: evaluate conditions in order and return the first match. You can nest CASE expressions, use them in WHERE clauses, and combine them with aggregates.",
        syntax: `SELECT\n  CASE\n    WHEN condition1 THEN 'value1'\n    WHEN condition2 THEN 'value2'\n    ELSE 'default'\n  END AS new_column\nFROM table;`,
        exampleTitle: "Classify titles by price into tiers",
        exampleInput: "titles table: title, price",
        exampleQuery: `SELECT title, price,\n  CASE\n    WHEN price < 10 THEN 'Budget'\n    WHEN price < 20 THEN 'Standard'\n    ELSE 'Premium'\n  END AS tier\nFROM titles\nORDER BY price;`,
        exampleOutput:
          "+---------------------------------------+-------+----------+\n| title                                 | price | tier     |\n+---------------------------------------+-------+----------+\n| The Gourmet Microwave                 |  2.99 | Budget   |\n| Cooking with Computers                | 11.95 | Standard |\n| Secrets of Silicon Valley             | 20.00 | Premium  |\n+---------------------------------------+-------+----------+",
        tryIt: {
          question:
            "Classify each author's location: 'West Coast' if state is CA or OR, 'East Coast' if state is NY or NJ, 'Other' otherwise.",
          hint: "Use CASE with IN ('CA', 'OR') and IN ('NY', 'NJ')",
          solution: `SELECT au_fname, au_lname, state,\n  CASE\n    WHEN state IN ('CA', 'OR') THEN 'West Coast'\n    WHEN state IN ('NY', 'NJ') THEN 'East Coast'\n    ELSE 'Other'\n  END AS region\nFROM authors;`,
        },
      },
      {
        concept: "NULL Handling with IFNULL and COALESCE",
        explanation:
          "NULL means 'unknown' or 'missing'. NULL is not zero, not empty string — it is the absence of a value. Arithmetic with NULL produces NULL. IFNULL (MySQL) or COALESCE (standard SQL) replaces NULL with a default value. This is critical for accurate calculations and clean reports.",
        syntax: `-- Replace NULL with a default value\nSELECT IFNULL(column, default_value) FROM table;\n\n-- COALESCE (works in all databases)\nSELECT COALESCE(column1, column2, default_value) FROM table;`,
        exampleTitle: "Estimate revenue for all titles (handle NULL prices and sales)",
        exampleInput: "titles table: title, price, ytd_sales (some may be NULL)",
        exampleQuery: `SELECT title,\n  IFNULL(price, 9.99) AS est_price,\n  IFNULL(ytd_sales, 1000) AS est_sales,\n  IFNULL(price, 9.99) * IFNULL(ytd_sales, 1000) AS est_revenue\nFROM titles;`,
        exampleOutput:
          "+---------------------------------------+-----------+-----------+-------------+\n| title                                 | est_price | est_sales | est_revenue |\n+---------------------------------------+-----------+-----------+-------------+\n| The Busy Executive's Database Guide   |     19.99 |      4096 |    81879.04 |\n| The Gourmet Microwave                 |      2.99 |      2251 |     6730.49 |\n+---------------------------------------+-----------+-----------+-------------+",
        tryIt: {
          question:
            "Display each title's price. If the price is NULL, show 'N/A'. Use COALESCE.",
          hint: "Use COALESCE(CAST(price AS CHAR), 'N/A')",
          solution: `SELECT title,\n  COALESCE(CAST(price AS CHAR), 'N/A') AS price_display\nFROM titles;`,
        },
      },
    ],
    summary:
      "String functions format text for reports, CASE adds conditional logic, and NULL handling ensures accurate calculations. These special functions turn raw data into polished, presentation-ready output.",
  },
  {
    stepId: 7,
    title: "Complex Analysis & Presentation",
    subtitle: "Multi-step queries and storytelling with data",
    introduction:
      "This is the capstone. You will combine everything you have learned — SELECT, JOIN, GROUP BY, aggregate functions, CASE, and special functions — to answer complex business questions and present your findings clearly. The goal is not just correct SQL, but clear storytelling.",
    sections: [
      {
        concept: "Multi-Step Analysis",
        explanation:
          "Complex questions often require multiple queries or subqueries. Break the problem into steps: first get the raw data, then summarize it, then analyze the summary. Think of it as a pipeline: raw data -> filtered data -> aggregated data -> insights.",
        syntax: `-- Step 1: Get detailed data\nSELECT ... FROM ... JOIN ... WHERE ...;\n\n-- Step 2: Aggregate the details\nSELECT ..., AGG_FUNC(...) FROM (...) AS subquery GROUP BY ...;\n\n-- Step 3: Filter and sort the aggregates\nSELECT ... HAVING ... ORDER BY ...;`,
        exampleTitle:
          "Which publisher types generate the most revenue? (multi-step analysis)",
        exampleInput:
          "Need to join publishers, titles, and sales, then aggregate",
        exampleQuery: `SELECT\n  p.pub_name,\n  COUNT(DISTINCT t.title_id) AS titles_published,\n  SUM(sa.qty) AS total_units_sold,\n  ROUND(SUM(sa.qty * t.price), 2) AS estimated_revenue\nFROM publishers p\nINNER JOIN titles t ON p.pub_id = t.pub_id\nINNER JOIN sales sa ON t.title_id = sa.title_id\nGROUP BY p.pub_name\nORDER BY estimated_revenue DESC;`,
        exampleOutput:
          "+-----------------+------------------+------------------+-------------------+\n| pub_name        | titles_published | total_units_sold | estimated_revenue |\n+-----------------+------------------+------------------+-------------------+\n| Algodata Info.. |               10 |             1234 |          18500.00 |\n| New Moon Books  |                5 |              890 |          12000.00 |\n+-----------------+------------------+------------------+-------------------+",
        tryIt: {
          question:
            "Find the top 3 best-selling titles (by total quantity sold). Show title name, total units sold, and estimated revenue.",
          hint: "Join titles and sales, GROUP BY title, ORDER BY total DESC LIMIT 3",
          solution: `SELECT t.title,\n  SUM(sa.qty) AS total_units_sold,\n  ROUND(SUM(sa.qty * t.price), 2) AS estimated_revenue\nFROM titles t\nINNER JOIN sales sa ON t.title_id = sa.title_id\nGROUP BY t.title_id, t.title\nORDER BY total_units_sold DESC\nLIMIT 3;`,
        },
      },
      {
        concept: "Data Quality Checks",
        explanation:
          "Before presenting findings, check for data quality issues: NULL values, missing records, duplicates, and inconsistencies. Use LEFT JOIN with IS NULL to find orphaned records. Use GROUP BY with HAVING to find duplicates. Use CASE to flag issues.",
        syntax: `-- Find records in A that have no match in B\nSELECT a.* FROM a\nLEFT JOIN b ON a.id = b.a_id\nWHERE b.a_id IS NULL;\n\n-- Find potential duplicates\nSELECT column, COUNT(*)\nFROM table\nGROUP BY column\nHAVING COUNT(*) > 1;`,
        exampleTitle: "Data quality audit: find issues in the database",
        exampleInput:
          "Checking for orphaned records, NULLs, and missing data",
        exampleQuery: `-- Titles with NULL prices\nSELECT title, price\nFROM titles\nWHERE price IS NULL;\n\n-- Authors without any published titles\nSELECT a.au_id, a.au_lname, a.au_fname\nFROM authors a\nLEFT JOIN titleauthor ta ON a.au_id = ta.au_id\nWHERE ta.au_id IS NULL;`,
        exampleOutput:
          "-- NULL prices:\n+---------------------------------------+-------+\n| title                                 | price |\n+---------------------------------------+-------+\n| But Is It User Friendly?              | NULL  |\n+---------------------------------------+-------+\n\n-- Authors without titles:\n+-------+-----------+-----------+\n| au_id | au_lname  | au_fname  |\n+-------+-----------+-----------+\n| 807   | Smith     | Meander   |\n+-------+-----------+-----------+",
        tryIt: {
          question:
            "Write a query to check if any titles have ytd_sales as NULL. Show title and a flag indicating whether sales data is missing.",
          hint: "Use CASE WHEN ytd_sales IS NULL THEN 'Missing' ELSE 'Available' END",
          solution: `SELECT title,\n  CASE\n    WHEN ytd_sales IS NULL THEN 'Missing'\n    ELSE 'Available'\n  END AS sales_data_status\nFROM titles;`,
        },
      },
      {
        concept: "Presenting Findings as a Story",
        explanation:
          "The final step is turning SQL results into a clear narrative. Structure your presentation: (1) What problem did you investigate? (2) What did you find? (3) What should leadership do? Use specific numbers from your queries to back up every claim.",
        syntax: `-- Build your evidence:\n-- 1. Key metric\nSELECT COUNT(*), ROUND(AVG(...), 2) FROM ...;\n\n-- 2. Breakdown\nSELECT category, COUNT(*), SUM(amount)\nFROM ... GROUP BY category ORDER BY ...;\n\n-- 3. Risk indicators\nSELECT ... FROM ... LEFT JOIN ... WHERE ... IS NULL;`,
        exampleTitle:
          "Board meeting: evidence-backed presentation structure",
        exampleInput:
          "Combining multiple query results into a narrative",
        exampleQuery: `-- Executive summary query\nSELECT\n  (SELECT COUNT(*) FROM authors) AS total_authors,\n  (SELECT COUNT(*) FROM titles) AS total_titles,\n  (SELECT ROUND(AVG(price), 2) FROM titles) AS avg_price,\n  (SELECT COUNT(*) FROM titles WHERE price IS NULL) AS missing_prices;`,
        exampleOutput:
          "+---------------+--------------+-----------+---------------+\n| total_authors | total_titles | avg_price | missing_prices|\n+---------------+--------------+-----------+---------------+\n|            23 |           18 |     14.48 |             1 |\n+---------------+--------------+-----------+---------------+",
        tryIt: {
          question:
            "Write a summary query that returns: total number of authors, total number of titles, average title price, and number of authors without any titles.",
          hint: "Use subqueries in the SELECT list for each metric",
          solution: `SELECT\n  (SELECT COUNT(*) FROM authors) AS total_authors,\n  (SELECT COUNT(*) FROM titles) AS total_titles,\n  (SELECT ROUND(AVG(price), 2) FROM titles) AS avg_price,\n  (SELECT COUNT(*) FROM authors a LEFT JOIN titleauthor ta ON a.au_id = ta.au_id WHERE ta.au_id IS NULL) AS authors_without_titles;`,
        },
      },
    ],
    summary:
      "You have mastered the full SQL toolkit: basic queries, filtering, joins, aggregation, modification, special functions, and complex analysis. The final skill is storytelling — turning query results into clear, actionable insights for leadership.",
  },
];

export function getTutorialByStepId(stepId: number): Tutorial | undefined {
  return TUTORIALS.find((t) => t.stepId === stepId);
}
