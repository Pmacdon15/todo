CREATE DATABASE IF NOT EXISTS todo_app_p3;
USE todo_app_p3;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (email, first_name, password)
VALUES 
    ('user1@example.com', 'User1', 'password1'),
    ('user2@example.com', 'User2', 'password2');

-- Insert todo items for user 1
INSERT INTO todo (user_id, title, description, completed, created)
VALUES 
    (1, 'User1 Todo 1', 'This is the first todo for User1.', false, NOW()),
    (1, 'User1 Todo 2', 'This is the second todo for User1.', false,  NOW());

-- Insert todo items for user 2
INSERT INTO todo (user_id, title, description, completed, created)
VALUES 
    (2, 'User2 Todo 1', 'This is the first todo for User2.', false, NOW()),
    (2, 'User2 Todo 2', 'This is the second todo for User2.', false, NOW());
