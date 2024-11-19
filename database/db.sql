CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role TEXT CHECK (role IN ('organizer', 'reviewer', 'author')) NOT NULL
);

CREATE TABLE conferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    abstract TEXT,
    file_url VARCHAR(255),
    status TEXT CHECK (status IN ('submitted', 'under review', 'accepted', 'rejected')) NOT NULL,
    author_id INTEGER,
    conference_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (conference_id) REFERENCES conferences(id)
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id INTEGER,
    reviewer_id INTEGER,
    feedback TEXT,
    rating INTEGER,
    FOREIGN KEY (paper_id) REFERENCES papers(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id)
);