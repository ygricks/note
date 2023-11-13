-- --------------
-- commands
-- --------------
-- -- login container with db
-- > docker exec -it note_db bash
-- -- login postgres
-- > psql -U postgres -d note_db
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

CREATE TABLE pin (
    id BIGSERIAL PRIMARY KEY,
    short VARCHAR(50) NOT NULL,
    color VARCHAR(20),
    message VARCHAR(200),
    created_at timestamp WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notepin (
    note_id BIGINT NOT NULL,
    pin_id BIGINT NOT NULL,
    created_at timestamp WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notepin_note FOREIGN KEY(note_id) REFERENCES note(id) ON DELETE RESTRICT,
    CONSTRAINT fk_notepin_pin FOREIGN KEY(pin_id) REFERENCES pin(id) ON DELETE RESTRICT,
    PRIMARY KEY (note_id, pin_id)
);

-- -- --
-- data
-- -- --

INSERT INTO note(short) VALUES
('first event'), -- 1
('second event'), -- 2
('third event'); -- 3

INSERT INTO pin(short) VALUES
('1.first'), -- 1
('interesting'), -- 2
('birthday'), -- 3
('game'), -- 4
('2.event'), -- 5
('3.event'), -- 6
('sad'); -- 7

INSERT INTO notepin(note_id, pin_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(3, 6),
(3, 7);
