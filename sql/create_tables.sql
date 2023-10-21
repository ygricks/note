-- --------------
-- commands
-- --------------
-- -- login container with db
-- > docker exec -it chat_postgres bash
-- -- login postgres
-- > psql -U postgres
-- -- show databases
-- > \l
-- -- connect to db
-- > \c
-- -- show tables
-- > \dt

-- --------------
-- tables
-- --------------

CREATE TABLE note (
    id BIGSERIAL PRIMARY KEY,
    short VARCHAR(50) NOT NULL,
    message VARCHAR(500),
    created_at timestamp WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO note(short) VALUES
('some'),
('other'),
('another');
