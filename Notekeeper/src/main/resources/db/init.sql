CREATE TABLE IF NOT EXISTS users
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name     VARCHAR(100) UNIQUE       NOT NULL,
    password VARCHAR(100)              NOT NULL,
    role     VARCHAR(100)              NOT NULL,
    email    VARCHAR(100) UNIQUE,
    enabled  BOOL                      NOT NULL,
    theme    VARCHAR(100)              DEFAULT 'default'
);

CREATE TABLE IF NOT EXISTS notes
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_id  INTEGER                   NOT NULL,
    text     TEXT
);

ALTER TABLE notes
    ADD CONSTRAINT fk_user_notes FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE;

