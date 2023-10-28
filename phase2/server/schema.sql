CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO todo (title, description , completed, created)
VALUES 
    ('First Note', 'This is my first note!', false, NOW()),
    ('Second Note', 'This is my second note!', false, NOW()),
    ('Third Note', 'This is my third note!', false, NOW());
