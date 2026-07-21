export interface ModuleData {
  moduleNumber: number;
  name: string;
  stepMapping: number;
  subTopics: SubTopicData[];
}

export interface SubTopicData {
  name: string;
  exercises: ExerciseData[];
}

export interface ExerciseData {
  exerciseNumber: string;
  instruction: string;
  expectedQuery: string;
  difficulty: "easy" | "medium" | "hard";
}

export const MODULES: ModuleData[] = [
  {
    moduleNumber: 2,
    name: "Reading Data (SELECT)",
    stepMapping: 2,
    subTopics: [
      {
        name: "Retrieve Columns",
        exercises: [
          { exerciseNumber: "2.1", instruction: "Retrieve all columns from the authors table", expectedQuery: "SELECT * FROM authors;", difficulty: "easy" },
          { exerciseNumber: "2.2", instruction: "Retrieve the au_lname and au_fname columns from the authors table", expectedQuery: "SELECT au_lname, au_fname FROM authors;", difficulty: "easy" },
          { exerciseNumber: "2.3", instruction: "Retrieve the title and price columns from the titles table", expectedQuery: "SELECT title, price FROM titles;", difficulty: "easy" },
          { exerciseNumber: "2.4", instruction: "Retrieve the pub_name column from the publishers table", expectedQuery: "SELECT pub_name FROM publishers;", difficulty: "easy" },
          { exerciseNumber: "2.5", instruction: "Retrieve the stor_name and city columns from the stores table", expectedQuery: "SELECT stor_name, city FROM stores;", difficulty: "easy" },
        ],
      },
      {
        name: "Column Aliases",
        exercises: [
          { exerciseNumber: "2.6", instruction: "Retrieve the author ID and last name as 'Author ID' and 'Last Name'", expectedQuery: "SELECT au_id AS 'Author ID', au_lname AS 'Last Name' FROM authors;", difficulty: "easy" },
          { exerciseNumber: "2.7", instruction: "Retrieve the title ID as 'ID' and price as 'Cost' from the titles table", expectedQuery: "SELECT title_id AS 'ID', price AS 'Cost' FROM titles;", difficulty: "easy" },
          { exerciseNumber: "2.8", instruction: "Retrieve the publisher name as 'Publisher Name' from the publishers table", expectedQuery: "SELECT pub_name AS 'Publisher Name' FROM publishers;", difficulty: "easy" },
          { exerciseNumber: "2.9", instruction: "Retrieve the store name as 'Name' and city as 'Location' from the stores table", expectedQuery: "SELECT stor_name AS 'Name', city AS 'Location' FROM stores;", difficulty: "easy" },
          { exerciseNumber: "2.10", instruction: "Retrieve the job description as 'Job Title' from the jobs table", expectedQuery: "SELECT job_desc AS 'Job Title' FROM jobs;", difficulty: "easy" },
        ],
      },
      {
        name: "LIMIT",
        exercises: [
          { exerciseNumber: "2.11", instruction: "Retrieve the first 5 rows from the authors table", expectedQuery: "SELECT * FROM authors LIMIT 5;", difficulty: "easy" },
          { exerciseNumber: "2.12", instruction: "Retrieve the top 10 titles from the titles table", expectedQuery: "SELECT * FROM titles LIMIT 10;", difficulty: "easy" },
          { exerciseNumber: "2.13", instruction: "Retrieve the first 3 publishers from the publishers table", expectedQuery: "SELECT * FROM publishers LIMIT 3;", difficulty: "easy" },
          { exerciseNumber: "2.14", instruction: "Retrieve the first 5 stores from the stores table", expectedQuery: "SELECT * FROM stores LIMIT 5;", difficulty: "easy" },
          { exerciseNumber: "2.15", instruction: "Retrieve the first 10 jobs from the jobs table", expectedQuery: "SELECT * FROM jobs LIMIT 10;", difficulty: "easy" },
        ],
      },
      {
        name: "DISTINCT",
        exercises: [
          { exerciseNumber: "2.16", instruction: "Retrieve distinct author IDs from the titleauthor table", expectedQuery: "SELECT DISTINCT au_id FROM titleauthor;", difficulty: "easy" },
          { exerciseNumber: "2.17", instruction: "Retrieve distinct titles from the titles table", expectedQuery: "SELECT DISTINCT title FROM titles;", difficulty: "easy" },
          { exerciseNumber: "2.18", instruction: "Retrieve distinct publisher names from the publishers table", expectedQuery: "SELECT DISTINCT pub_name FROM publishers;", difficulty: "easy" },
          { exerciseNumber: "2.19", instruction: "Retrieve distinct store names from the stores table", expectedQuery: "SELECT DISTINCT stor_name FROM stores;", difficulty: "easy" },
          { exerciseNumber: "2.20", instruction: "Retrieve distinct job descriptions from the jobs table", expectedQuery: "SELECT DISTINCT job_desc FROM jobs;", difficulty: "easy" },
        ],
      },
      {
        name: "WHERE",
        exercises: [
          { exerciseNumber: "2.21", instruction: "Retrieve authors with a contract status of '1'", expectedQuery: "SELECT * FROM authors WHERE contract = 1;", difficulty: "easy" },
          { exerciseNumber: "2.22", instruction: "Retrieve titles with a price greater than 50", expectedQuery: "SELECT * FROM titles WHERE price > 50;", difficulty: "easy" },
          { exerciseNumber: "2.23", instruction: "Retrieve publishers located in 'New York'", expectedQuery: "SELECT * FROM publishers WHERE city = 'New York';", difficulty: "easy" },
          { exerciseNumber: "2.24", instruction: "Retrieve stores with a zip code of '10001'", expectedQuery: "SELECT * FROM stores WHERE zip = '10001';", difficulty: "easy" },
          { exerciseNumber: "2.25", instruction: "Retrieve jobs with a max_lvl greater than or equal to 5", expectedQuery: "SELECT * FROM jobs WHERE max_lvl >= 5;", difficulty: "easy" },
        ],
      },
      {
        name: "Comparison Operators",
        exercises: [
          { exerciseNumber: "2.26", instruction: "Retrieve authors with an au_id equal to '1002'", expectedQuery: "SELECT * FROM authors WHERE au_id = '1002';", difficulty: "easy" },
          { exerciseNumber: "2.27", instruction: "Retrieve titles with a price not equal to 10", expectedQuery: "SELECT * FROM titles WHERE price != 10;", difficulty: "easy" },
          { exerciseNumber: "2.28", instruction: "Retrieve titles with a price greater than 20", expectedQuery: "SELECT * FROM titles WHERE price > 20;", difficulty: "easy" },
          { exerciseNumber: "2.29", instruction: "Retrieve titles with a price less than 15", expectedQuery: "SELECT * FROM titles WHERE price < 15;", difficulty: "easy" },
          { exerciseNumber: "2.30", instruction: "Retrieve titles with a price greater than or equal to 50", expectedQuery: "SELECT * FROM titles WHERE price >= 50;", difficulty: "easy" },
        ],
      },
      {
        name: "Logical Operators",
        exercises: [
          { exerciseNumber: "2.31", instruction: "Retrieve authors with contract=1 AND city='New York'", expectedQuery: "SELECT * FROM authors WHERE contract = 1 AND city = 'New York';", difficulty: "medium" },
          { exerciseNumber: "2.32", instruction: "Retrieve titles with price < 10 OR price > 100", expectedQuery: "SELECT * FROM titles WHERE price < 10 OR price > 100;", difficulty: "medium" },
          { exerciseNumber: "2.33", instruction: "Retrieve titles NOT published by 'Algodata Infosystems'", expectedQuery: "SELECT * FROM titles WHERE pub_id != '1389';", difficulty: "medium" },
          { exerciseNumber: "2.34", instruction: "Retrieve authors with contract=0 OR city='Chicago'", expectedQuery: "SELECT * FROM authors WHERE contract = 0 OR city = 'Chicago';", difficulty: "medium" },
          { exerciseNumber: "2.35", instruction: "Retrieve authors with contract=1 AND NOT living in 'New York'", expectedQuery: "SELECT * FROM authors WHERE contract = 1 AND city != 'New York';", difficulty: "medium" },
        ],
      },
      {
        name: "Pattern Matching",
        exercises: [
          { exerciseNumber: "2.36", instruction: "Retrieve titles containing 'SQL'", expectedQuery: "SELECT * FROM titles WHERE title LIKE '%SQL%';", difficulty: "medium" },
          { exerciseNumber: "2.37", instruction: "Retrieve publishers in 'New York' or 'California'", expectedQuery: "SELECT * FROM publishers WHERE city IN ('New York', 'California');", difficulty: "medium" },
          { exerciseNumber: "2.38", instruction: "Retrieve stores with stor_name starting with 'Book%'", expectedQuery: "SELECT * FROM stores WHERE stor_name LIKE 'Book%';", difficulty: "medium" },
          { exerciseNumber: "2.39", instruction: "Retrieve authors with last name ending with 'son'", expectedQuery: "SELECT * FROM authors WHERE au_lname LIKE '%son';", difficulty: "medium" },
        ],
      },
      {
        name: "NULL Comparison",
        exercises: [
          { exerciseNumber: "2.40", instruction: "Retrieve authors with phone IS NULL", expectedQuery: "SELECT * FROM authors WHERE phone IS NULL;", difficulty: "medium" },
          { exerciseNumber: "2.41", instruction: "Retrieve titles with notes IS NOT NULL", expectedQuery: "SELECT * FROM titles WHERE notes IS NOT NULL;", difficulty: "medium" },
          { exerciseNumber: "2.42", instruction: "Retrieve authors with city IS NULL OR city = ''", expectedQuery: "SELECT * FROM authors WHERE city IS NULL OR city = '';", difficulty: "medium" },
          { exerciseNumber: "2.43", instruction: "Retrieve titles with price IS NOT NULL", expectedQuery: "SELECT * FROM titles WHERE price IS NOT NULL;", difficulty: "medium" },
          { exerciseNumber: "2.44", instruction: "Retrieve authors with contract IS NULL", expectedQuery: "SELECT * FROM authors WHERE contract IS NULL;", difficulty: "medium" },
        ],
      },
      {
        name: "Chain WHERE Operators",
        exercises: [
          { exerciseNumber: "2.45", instruction: "contract=1 AND city='New York'", expectedQuery: "SELECT * FROM authors WHERE contract = 1 AND city = 'New York';", difficulty: "medium" },
          { exerciseNumber: "2.46", instruction: "price < 20 AND pub_id='1389'", expectedQuery: "SELECT * FROM titles WHERE price < 20 AND pub_id = '1389';", difficulty: "medium" },
          { exerciseNumber: "2.47", instruction: "(price < 10 OR price > 100) AND pub_id != '1389'", expectedQuery: "SELECT * FROM titles WHERE (price < 10 OR price > 100) AND pub_id != '1389';", difficulty: "medium" },
          { exerciseNumber: "2.48", instruction: "(contract=0 OR city='Chicago') AND state='IL'", expectedQuery: "SELECT * FROM authors WHERE (contract = 0 OR city = 'Chicago') AND state = 'IL';", difficulty: "medium" },
          { exerciseNumber: "2.49", instruction: "contract=1 AND (city='New York' OR city='Chicago')", expectedQuery: "SELECT * FROM authors WHERE contract = 1 AND (city = 'New York' OR city = 'Chicago');", difficulty: "medium" },
        ],
      },
      {
        name: "ORDER BY + Aliases + Math",
        exercises: [
          { exerciseNumber: "2.50", instruction: "Authors ordered by last name ASC", expectedQuery: "SELECT * FROM authors ORDER BY au_lname ASC;", difficulty: "easy" },
          { exerciseNumber: "2.51", instruction: "Titles ordered by price DESC", expectedQuery: "SELECT * FROM titles ORDER BY price DESC;", difficulty: "easy" },
          { exerciseNumber: "2.52", instruction: "Publishers ordered by city ASC, pub_name DESC", expectedQuery: "SELECT * FROM publishers ORDER BY city ASC, pub_name DESC;", difficulty: "medium" },
          { exerciseNumber: "2.53", instruction: "Stores ordered by state DESC, stor_name ASC", expectedQuery: "SELECT * FROM stores ORDER BY state DESC, stor_name ASC;", difficulty: "medium" },
          { exerciseNumber: "2.54", instruction: "Jobs ordered by max_lvl ASC, min_lvl DESC", expectedQuery: "SELECT * FROM jobs ORDER BY max_lvl ASC, min_lvl DESC;", difficulty: "medium" },
          { exerciseNumber: "2.55", instruction: "Titles with prices as 'Cost'", expectedQuery: "SELECT title, price AS Cost FROM titles;", difficulty: "easy" },
          { exerciseNumber: "2.56", instruction: "Publishers with names as 'Publisher'", expectedQuery: "SELECT pub_name AS Publisher FROM publishers;", difficulty: "easy" },
          { exerciseNumber: "2.57", instruction: "Stores with names as 'Store Name' and cities as 'Location'", expectedQuery: "SELECT stor_name AS 'Store Name', city AS Location FROM stores;", difficulty: "easy" },
          { exerciseNumber: "2.58", instruction: "Jobs with descriptions as 'Job Description'", expectedQuery: "SELECT job_desc AS 'Job Description' FROM jobs;", difficulty: "easy" },
          { exerciseNumber: "2.59", instruction: "Total sales quantity and amount per store", expectedQuery: "SELECT stor_id, SUM(qty) AS total_qty, SUM(qty * ISNULL((SELECT price FROM titles t WHERE t.title_id = s.title_id), 0)) AS total_amount FROM sales s GROUP BY stor_id;", difficulty: "hard" },
        ],
      },
    ],
  },
  {
    moduleNumber: 3,
    name: "INSERT/UPDATE/DELETE",
    stepMapping: 3,
    subTopics: [
      {
        name: "INSERT",
        exercises: [
          { exerciseNumber: "3.1", instruction: "Insert new store: '9000', 'Books Galore', '123 Main St.', 'Anytown', 'NY', '12345'", expectedQuery: "INSERT INTO stores VALUES ('9000', 'Books Galore', '123 Main St.', 'Anytown', 'NY', '12345');", difficulty: "easy" },
          { exerciseNumber: "3.2", instruction: "Insert new employee: 'XYZ123', 'John', 'D', 'Smith', job_id=6, job_lvl=215, pub_id='9952', hire_date='19800101'", expectedQuery: "INSERT INTO employee VALUES ('XYZ123', 'John', 'D', 'Smith', 6, 215, '9952', '19800101');", difficulty: "easy" },
          { exerciseNumber: "3.3", instruction: "Insert new sale: '7066', 'XYZ789', '20230621', 10, 'Net 30', 'PS2091'", expectedQuery: "INSERT INTO sales VALUES ('7066', 'XYZ789', '20230621', 10, 'Net 30', 'PS2091');", difficulty: "easy" },
          { exerciseNumber: "3.4", instruction: "Insert new discount: 'Bundle Discount', NULL, 100, 1000, 8.5", expectedQuery: "INSERT INTO discounts VALUES ('Bundle Discount', NULL, 100, 1000, 8.5);", difficulty: "easy" },
          { exerciseNumber: "3.5", instruction: "Insert new roysched: 'BU1032', 5000, 10000, 15", expectedQuery: "INSERT INTO roysched VALUES ('BU1032', 5000, 10000, 15);", difficulty: "easy" },
        ],
      },
      {
        name: "UPDATE",
        exercises: [
          { exerciseNumber: "3.6", instruction: "Update job level to 20 where current level < 100", expectedQuery: "UPDATE employee SET job_lvl = 20 WHERE job_lvl < 100;", difficulty: "medium" },
          { exerciseNumber: "3.7", instruction: "Update advance of 'Secrets of Silicon Valley' to 10000", expectedQuery: "UPDATE titles SET advance = 10000 WHERE title = 'Secrets of Silicon Valley';", difficulty: "medium" },
          { exerciseNumber: "3.8", instruction: "Change Oakland to San Francisco", expectedQuery: "UPDATE authors SET city = 'San Francisco' WHERE city = 'Oakland';", difficulty: "medium" },
          { exerciseNumber: "3.9", instruction: "Update store address for 'News & Brews'", expectedQuery: "UPDATE stores SET stor_address = '1234 New Street' WHERE stor_name = 'News & Brews';", difficulty: "medium" },
          { exerciseNumber: "3.10", instruction: "Increase all title prices by 10%", expectedQuery: "UPDATE titles SET price = price * 1.10;", difficulty: "medium" },
          { exerciseNumber: "3.11", instruction: "Update royalty for 'BU1032' to 15", expectedQuery: "UPDATE roysched SET royalty = 15 WHERE title_id = 'BU1032';", difficulty: "medium" },
          { exerciseNumber: "3.12", instruction: "Update city and country for publisher '0736'", expectedQuery: "UPDATE publishers SET city = 'Los Angeles', country = 'USA' WHERE pub_id = '0736';", difficulty: "medium" },
          { exerciseNumber: "3.13", instruction: "Change 'business' type to 'economy'", expectedQuery: "UPDATE titles SET type = 'economy' WHERE type = 'business';", difficulty: "medium" },
          { exerciseNumber: "3.14", instruction: "Set phone to '123-456-7890' for Smith authors", expectedQuery: "UPDATE authors SET phone = '123-456-7890' WHERE au_lname = 'Smith';", difficulty: "medium" },
          { exerciseNumber: "3.15", instruction: "Increase discount by 5% for store '8042'", expectedQuery: "UPDATE discounts SET discount = discount + 5 WHERE stor_id = '8042';", difficulty: "medium" },
        ],
      },
      {
        name: "DELETE",
        exercises: [
          { exerciseNumber: "3.16", instruction: "Delete authors with first name starting with 'A' in Berkeley", expectedQuery: "DELETE FROM authors WHERE au_fname LIKE 'A%' AND city = 'Berkeley';", difficulty: "medium" },
          { exerciseNumber: "3.17", instruction: "Delete all authors from cities starting with 'S'", expectedQuery: "DELETE FROM authors WHERE city LIKE 'S%';", difficulty: "medium" },
          { exerciseNumber: "3.18", instruction: "Delete authors with last name ending with 'l' in Palo Alto", expectedQuery: "DELETE FROM authors WHERE au_lname LIKE '%l' AND city = 'Palo Alto';", difficulty: "medium" },
          { exerciseNumber: "3.19", instruction: "Delete all authors from Berkeley or Oakland", expectedQuery: "DELETE FROM authors WHERE city IN ('Berkeley', 'Oakland');", difficulty: "medium" },
          { exerciseNumber: "3.20", instruction: "Delete books with type 'business' and price > 15", expectedQuery: "DELETE FROM titles WHERE type = 'business' AND price > 15.00;", difficulty: "medium" },
        ],
      },
    ],
  },
  {
    moduleNumber: 4,
    name: "Aggregates",
    stepMapping: 4,
    subTopics: [
      {
        name: "Aggregates",
        exercises: [
          { exerciseNumber: "4.1", instruction: "Count all authors", expectedQuery: "SELECT COUNT(*) AS total_authors FROM authors;", difficulty: "easy" },
          { exerciseNumber: "4.2", instruction: "Average price of all titles", expectedQuery: "SELECT ROUND(AVG(price), 2) AS avg_price FROM titles;", difficulty: "easy" },
          { exerciseNumber: "4.3", instruction: "Count authors per city", expectedQuery: "SELECT city, COUNT(*) AS author_count FROM authors GROUP BY city ORDER BY author_count DESC;", difficulty: "medium" },
          { exerciseNumber: "4.4", instruction: "Count titles per type", expectedQuery: "SELECT type, COUNT(*) AS title_count FROM titles GROUP BY type ORDER BY title_count DESC;", difficulty: "medium" },
          { exerciseNumber: "4.5", instruction: "Count authors per state having more than 1", expectedQuery: "SELECT state, COUNT(*) AS author_count FROM authors GROUP BY state HAVING COUNT(*) > 1;", difficulty: "medium" },
          { exerciseNumber: "4.6", instruction: "Max price per type having max > 15", expectedQuery: "SELECT type, MAX(price) AS max_price FROM titles GROUP BY type HAVING MAX(price) > 15;", difficulty: "medium" },
          { exerciseNumber: "4.7", instruction: "Min price per type having min < 20", expectedQuery: "SELECT type, MIN(price) AS min_price FROM titles GROUP BY type HAVING MIN(price) < 20;", difficulty: "medium" },
          { exerciseNumber: "4.8", instruction: "Count publishers per country having more than 1", expectedQuery: "SELECT country, COUNT(*) AS pub_count FROM publishers GROUP BY country HAVING COUNT(*) > 1;", difficulty: "medium" },
          { exerciseNumber: "4.9", instruction: "Avg price per type where advance > 5000 DESC", expectedQuery: "SELECT type, ROUND(AVG(price), 2) AS avg_price FROM titles WHERE advance > 5000 GROUP BY type ORDER BY avg_price DESC;", difficulty: "hard" },
          { exerciseNumber: "4.10", instruction: "Min and max price per type with >2 titles and avg > 15", expectedQuery: "SELECT type, MIN(price) AS min_price, MAX(price) AS max_price FROM titles GROUP BY type HAVING COUNT(*) > 2 AND AVG(price) > 15;", difficulty: "hard" },
          { exerciseNumber: "4.11", instruction: "Count publishers per country having >2 and starting with 'U'", expectedQuery: "SELECT country, COUNT(*) AS pub_count FROM publishers GROUP BY country HAVING COUNT(*) > 2 AND country LIKE 'U%';", difficulty: "hard" },
        ],
      },
    ],
  },
  {
    moduleNumber: 5,
    name: "JOINs",
    stepMapping: 5,
    subTopics: [
      {
        name: "JOINs",
        exercises: [
          { exerciseNumber: "5.1", instruction: "INNER JOIN authors with titleauthor", expectedQuery: "SELECT a.au_id, a.au_lname, a.au_fname, ta.title_id FROM authors a INNER JOIN titleauthor ta ON a.au_id = ta.au_id;", difficulty: "medium" },
          { exerciseNumber: "5.2", instruction: "INNER JOIN titles with publishers (title, price, pub_name)", expectedQuery: "SELECT t.title, t.price, p.pub_name FROM titles t INNER JOIN publishers p ON t.pub_id = p.pub_id;", difficulty: "medium" },
          { exerciseNumber: "5.3", instruction: "INNER JOIN titles with publishers, avg price per publisher", expectedQuery: "SELECT p.pub_name, ROUND(AVG(t.price), 2) AS avg_price FROM titles t INNER JOIN publishers p ON t.pub_id = p.pub_id GROUP BY p.pub_id, p.pub_name;", difficulty: "hard" },
          { exerciseNumber: "5.4", instruction: "INNER JOIN authors with titles (names)", expectedQuery: "SELECT a.au_fname, a.au_lname, t.title FROM authors a INNER JOIN titleauthor ta ON a.au_id = ta.au_id INNER JOIN titles t ON ta.title_id = t.title_id;", difficulty: "hard" },
          { exerciseNumber: "5.5", instruction: "Titles with multiple authors (title_id, count)", expectedQuery: "SELECT ta.title_id, COUNT(ta.au_id) AS author_count FROM titleauthor ta GROUP BY ta.title_id HAVING COUNT(ta.au_id) > 1;", difficulty: "hard" },
          { exerciseNumber: "5.6", instruction: "Title name with multiple authors", expectedQuery: "SELECT t.title, COUNT(ta.au_id) AS author_count FROM titles t INNER JOIN titleauthor ta ON t.title_id = ta.title_id GROUP BY t.title_id, t.title HAVING COUNT(ta.au_id) > 1;", difficulty: "hard" },
          { exerciseNumber: "5.7", instruction: "Authors without titles (LEFT JOIN)", expectedQuery: "SELECT a.au_id, a.au_lname, a.au_fname FROM authors a LEFT JOIN titleauthor ta ON a.au_id = ta.au_id WHERE ta.au_id IS NULL;", difficulty: "hard" },
          { exerciseNumber: "5.7b", instruction: "Discussion - foreign key constraints prevent deletion of referenced rows in titleauthor", expectedQuery: "-- Discussion exercise: foreign key constraints prevent deletion of referenced rows in titleauthor", difficulty: "easy" },
        ],
      },
    ],
  },
  {
    moduleNumber: 6,
    name: "Database Creation",
    stepMapping: 6,
    subTopics: [
      {
        name: "Database Creation",
        exercises: [
          { exerciseNumber: "6.1", instruction: "CREATE DATABASE myDatabase", expectedQuery: "CREATE DATABASE myDatabase;", difficulty: "easy" },
          { exerciseNumber: "6.2", instruction: "Switch to myDatabase", expectedQuery: "USE myDatabase;", difficulty: "easy" },
          { exerciseNumber: "6.3", instruction: "CREATE TABLE students", expectedQuery: "CREATE TABLE students (student_id NUMERIC PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), date_of_birth DATE);", difficulty: "medium" },
          { exerciseNumber: "6.4", instruction: "CREATE TABLE courses with AUTO_INCREMENT", expectedQuery: "CREATE TABLE courses (course_id INT AUTO_INCREMENT PRIMARY KEY, course_name VARCHAR(100), credit_hours INT);", difficulty: "medium" },
          { exerciseNumber: "6.5", instruction: "Add UNIQUE to course_name", expectedQuery: "ALTER TABLE courses ADD CONSTRAINT UNIQUE (course_name);", difficulty: "medium" },
          { exerciseNumber: "6.6", instruction: "CREATE TABLE professors", expectedQuery: "CREATE TABLE professors (professor_id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), subject VARCHAR(100));", difficulty: "medium" },
          { exerciseNumber: "6.7", instruction: "Add NOT NULL to subject", expectedQuery: "ALTER TABLE professors MODIFY subject VARCHAR(100) NOT NULL;", difficulty: "medium" },
          { exerciseNumber: "6.8", instruction: "CREATE TABLE classrooms", expectedQuery: "CREATE TABLE classrooms (classroom_id INT AUTO_INCREMENT PRIMARY KEY, classroom_name VARCHAR(100), capacity INT);", difficulty: "medium" },
          { exerciseNumber: "6.9", instruction: "Add CHECK capacity > 0", expectedQuery: "ALTER TABLE classrooms ADD CONSTRAINT chk_capacity CHECK (capacity > 0);", difficulty: "medium" },
          { exerciseNumber: "6.10", instruction: "CREATE TABLE enrollment with FK", expectedQuery: "CREATE TABLE enrollment (enrollment_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT, course_id INT, FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (course_id) REFERENCES courses(course_id));", difficulty: "hard" },
        ],
      },
    ],
  },
  {
    moduleNumber: 7,
    name: "Advanced Functions",
    stepMapping: 6,
    subTopics: [
      {
        name: "String Functions",
        exercises: [
          { exerciseNumber: "7.1", instruction: "Authors first name starts with 'A' using LEFT()", expectedQuery: "SELECT * FROM authors WHERE LEFT(au_fname, 1) = 'A';", difficulty: "medium" },
          { exerciseNumber: "7.2", instruction: "Authors by initials using CONCAT() and LEFT()", expectedQuery: "SELECT CONCAT(LEFT(au_fname, 1), '. ', LEFT(au_lname, 1), '.') AS initials FROM authors;", difficulty: "medium" },
          { exerciseNumber: "7.3", instruction: "Authors with '415' area code using SUBSTRING()", expectedQuery: "SELECT au_lname, au_fname, phone FROM authors WHERE SUBSTRING(phone, 1, 3) = '415';", difficulty: "medium" },
          { exerciseNumber: "7.4", instruction: "First name to lower case using LOWER()", expectedQuery: "SELECT LOWER(au_fname) AS lower_firstname FROM authors;", difficulty: "easy" },
          { exerciseNumber: "7.5", instruction: "Length of first names using CHAR_LENGTH()", expectedQuery: "SELECT au_fname, CHAR_LENGTH(au_fname) AS name_length FROM authors;", difficulty: "easy" },
          { exerciseNumber: "7.6", instruction: "Authors with last name containing 'er' using LOCATE()", expectedQuery: "SELECT au_lname, au_fname FROM authors WHERE LOCATE('er', au_lname) > 0;", difficulty: "medium" },
          { exerciseNumber: "7.7", instruction: "Reverse first and last names using CONCAT() and REVERSE()", expectedQuery: "SELECT CONCAT(REVERSE(au_fname), ' ', REVERSE(au_lname)) AS reversed_name FROM authors;", difficulty: "medium" },
        ],
      },
      {
        name: "Date Functions",
        exercises: [
          { exerciseNumber: "7.8", instruction: "Current date", expectedQuery: "SELECT CURRENT_DATE();", difficulty: "easy" },
          { exerciseNumber: "7.9", instruction: "Days since start of year", expectedQuery: "SELECT DATEDIFF(CURRENT_DATE(), CONCAT(YEAR(CURRENT_DATE()), '-01-01')) AS days_elapsed;", difficulty: "medium" },
          { exerciseNumber: "7.10", instruction: "Employee hire dates formatted", expectedQuery: "SELECT fname, lname, DATE_FORMAT(STR_TO_DATE(hire_date, '%Y%m%d'), '%Y-%m-%d') AS formatted_hire_date FROM employee;", difficulty: "hard" },
          { exerciseNumber: "7.11", instruction: "Employees hired in December", expectedQuery: "SELECT * FROM employee WHERE MONTH(STR_TO_DATE(hire_date, '%Y%m%d')) = 12;", difficulty: "hard" },
          { exerciseNumber: "7.12", instruction: "Days since each employee was hired", expectedQuery: "SELECT fname, lname, DATEDIFF(CURRENT_DATE(), STR_TO_DATE(hire_date, '%Y%m%d')) AS days_employed FROM employee;", difficulty: "hard" },
          { exerciseNumber: "7.13", instruction: "Sale order dates formatted", expectedQuery: "SELECT stor_id, ord_num, DATE_FORMAT(STR_TO_DATE(ord_date, '%Y%m%d'), '%Y-%m-%d') AS formatted_order_date FROM sales;", difficulty: "hard" },
          { exerciseNumber: "7.14", instruction: "Sales in Q1 (Jan-Mar)", expectedQuery: "SELECT * FROM sales WHERE MONTH(STR_TO_DATE(ord_date, '%Y%m%d')) BETWEEN 1 AND 3;", difficulty: "hard" },
          { exerciseNumber: "7.15", instruction: "Days since each sale", expectedQuery: "SELECT ord_num, DATEDIFF(CURRENT_DATE(), STR_TO_DATE(ord_date, '%Y%m%d')) AS days_since_sale FROM sales;", difficulty: "hard" },
          { exerciseNumber: "7.16", instruction: "Today's date and time formatted", expectedQuery: "SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS current_datetime;", difficulty: "medium" },
        ],
      },
      {
        name: "Aggregate Functions",
        exercises: [
          { exerciseNumber: "7.17", instruction: "Total number of authors", expectedQuery: "SELECT COUNT(*) AS total_authors FROM authors;", difficulty: "easy" },
          { exerciseNumber: "7.18", instruction: "Average price of all titles", expectedQuery: "SELECT ROUND(AVG(price), 2) AS avg_price FROM titles;", difficulty: "easy" },
          { exerciseNumber: "7.19", instruction: "Min and max advance", expectedQuery: "SELECT MIN(advance) AS min_advance, MAX(advance) AS max_advance FROM titles;", difficulty: "easy" },
          { exerciseNumber: "7.20", instruction: "Total sales per store", expectedQuery: "SELECT stor_id, SUM(qty) AS total_sales FROM sales GROUP BY stor_id;", difficulty: "medium" },
          { exerciseNumber: "7.21", instruction: "Titles per publisher", expectedQuery: "SELECT p.pub_name, COUNT(t.title_id) AS title_count FROM publishers p LEFT JOIN titles t ON p.pub_id = t.pub_id GROUP BY p.pub_id, p.pub_name;", difficulty: "hard" },
          { exerciseNumber: "7.22", instruction: "Employees per publisher", expectedQuery: "SELECT p.pub_name, COUNT(e.emp_id) AS employee_count FROM publishers p LEFT JOIN employee e ON p.pub_id = e.pub_id GROUP BY p.pub_id, p.pub_name;", difficulty: "hard" },
          { exerciseNumber: "7.23", instruction: "Total royalties per title", expectedQuery: "SELECT t.title, SUM(s.qty * t.price * (t.royalty / 100.0)) AS total_royalties FROM titles t INNER JOIN sales s ON t.title_id = s.title_id GROUP BY t.title_id, t.title;", difficulty: "hard" },
          { exerciseNumber: "7.24", instruction: "Author with most books", expectedQuery: "SELECT a.au_fname, a.au_lname, COUNT(ta.title_id) AS book_count FROM authors a INNER JOIN titleauthor ta ON a.au_id = ta.au_id GROUP BY a.au_id, a.au_fname, a.au_lname ORDER BY book_count DESC LIMIT 1;", difficulty: "hard" },
          { exerciseNumber: "7.25", instruction: "Avg price per publisher", expectedQuery: "SELECT p.pub_name, ROUND(AVG(t.price), 2) AS avg_price FROM publishers p INNER JOIN titles t ON p.pub_id = t.pub_id GROUP BY p.pub_id, p.pub_name;", difficulty: "hard" },
          { exerciseNumber: "7.26", instruction: "Orders per book", expectedQuery: "SELECT t.title, COUNT(s.ord_num) AS order_count FROM titles t LEFT JOIN sales s ON t.title_id = s.title_id GROUP BY t.title_id, t.title;", difficulty: "hard" },
        ],
      },
      {
        name: "Control Flow Functions",
        exercises: [
          { exerciseNumber: "7.27", instruction: "IF() classify expensive vs cheap", expectedQuery: "SELECT title, price, IF(price > 20, 'Expensive', 'Cheap') AS category FROM titles;", difficulty: "medium" },
          { exerciseNumber: "7.28", instruction: "CASE classify authors by state", expectedQuery: "SELECT au_fname, au_lname, state, CASE state WHEN 'CA' THEN 'California' WHEN 'NY' THEN 'New York' WHEN 'TN' THEN 'Tennessee' ELSE 'Other' END AS state_name FROM authors;", difficulty: "medium" },
          { exerciseNumber: "7.29", instruction: "IFNULL for NULL addresses", expectedQuery: "SELECT au_fname, au_lname, IFNULL(address, 'No Address Provided') AS address FROM authors;", difficulty: "medium" },
          { exerciseNumber: "7.30", instruction: "NULLIF replace 'UNKNOWN' with NULL", expectedQuery: "SELECT au_fname, au_lname, NULLIF(phone, 'UNKNOWN') AS phone FROM authors;", difficulty: "medium" },
          { exerciseNumber: "7.31", instruction: "COALESCE first non-null of address, city, state", expectedQuery: "SELECT au_fname, au_lname, COALESCE(address, city, state) AS first_available FROM authors;", difficulty: "medium" },
          { exerciseNumber: "7.32", instruction: "IF() classify sales qty", expectedQuery: "SELECT ord_num, qty, IF(qty > 100, 'High', IF(qty BETWEEN 50 AND 100, 'Medium', 'Low')) AS volume FROM sales;", difficulty: "hard" },
          { exerciseNumber: "7.33", instruction: "CASE rate titles by price", expectedQuery: "SELECT title, price, CASE WHEN price < 10 THEN 'Budget' WHEN price < 20 THEN 'Standard' WHEN price < 30 THEN 'Premium' ELSE 'Luxury' END AS rating FROM titles;", difficulty: "medium" },
          { exerciseNumber: "7.34", instruction: "IFNULL classify publishers by state", expectedQuery: "SELECT pub_name, IFNULL(state, 'UNKNOWN') AS state FROM publishers;", difficulty: "medium" },
          { exerciseNumber: "7.35", instruction: "NULLIF + COALESCE for phone", expectedQuery: "SELECT au_fname, au_lname, COALESCE(NULLIF(phone, 'UNKNOWN'), 'No Phone Provided') AS phone FROM authors;", difficulty: "hard" },
          { exerciseNumber: "7.36", instruction: "CASE classify by contract status", expectedQuery: "SELECT au_fname, au_lname, IF(contract = 1, 'Contracted', 'Non-contracted') AS status FROM authors;", difficulty: "medium" },
        ],
      },
    ],
  },
];
