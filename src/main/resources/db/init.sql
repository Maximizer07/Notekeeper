CREATE TABLE IF NOT EXISTS users
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name     VARCHAR(100) UNIQUE       NOT NULL,
    password VARCHAR(100)              NOT NULL,
    role     VARCHAR(100)              NOT NULL,
    email    VARCHAR(100) UNIQUE,
    enabled  BOOL                      NOT NULL
);

CREATE TABLE IF NOT EXISTS notes
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_id  INTEGER                   NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    title    VARCHAR(100)              NOT NULL,
    text     text,
    color    VARCHAR(100)              DEFAULT 'FFFFFF'
);

