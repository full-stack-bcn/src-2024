PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (user_id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT);
INSERT INTO users VALUES(1,'Menganito García');
INSERT INTO users VALUES(2,'Fulanito Gómez');
CREATE TABLE emails (email_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER REFERENCES "users"(user_id), email TEXT);
INSERT INTO emails VALUES(1,1,'menganito.garcia@hotmail.com');
INSERT INTO emails VALUES(2,2,'fulgomez@gmail.com');
INSERT INTO emails VALUES(4,1,'mgarcia@twitter.com');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('users',4);
INSERT INTO sqlite_sequence VALUES('emails',4);
COMMIT;
