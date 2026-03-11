CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id CHAR(36),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE tags (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    user_id CHAR(36),

    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE tasks (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status ENUM('pending','completed') DEFAULT 'pending',
    category_id CHAR(36),
    user_id CHAR(36),

    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE tags_tasks (
    tag_id CHAR(36),
    task_id CHAR(36),

    PRIMARY KEY (tag_id, task_id),

    FOREIGN KEY (tag_id) REFERENCES tags(id)
    ON DELETE CASCADE,

    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON DELETE CASCADE
);
