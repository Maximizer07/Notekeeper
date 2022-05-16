CREATE TABLE IF NOT EXISTS users
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE       NOT NULL,
    name     VARCHAR(100)              NOT NULL,
    password VARCHAR(100)              NOT NULL,
    role     VARCHAR(100)              NOT NULL,
    email    VARCHAR(100) UNIQUE,
    enabled  BOOL                      NOT NULL
);

CREATE TABLE IF NOT EXISTS notes
(
    id       SERIAL PRIMARY KEY UNIQUE NOT NULL,
    title                 VARCHAR(100) NOT NULL,
    text     TEXT                      NOT NULL,
    last_modified     TEXT              NOT NULL,
    user_id  INTEGER                   NOT NULL
);

ALTER TABLE notes
    ADD CONSTRAINT fk_user_notes FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE;

