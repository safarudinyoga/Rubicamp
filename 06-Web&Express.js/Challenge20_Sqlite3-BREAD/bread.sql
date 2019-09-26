CREATE TABLE challenge20(
    id          INTEGER     PRIMARY KEY,
    string      TEXT        NOT NULL,
    integer     INTEGER     NOT NULL,
    float       REAL        NOT NULL,
    date        TEXT        NOT NULL,
    boolean     VARCHAR(5)  NOT NULL
);
INSERT INTO challenge20 (string, integer, float, date, boolean)
VALUES ('tole', 24, 12.4, '23/12/2019', 'true');
INSERT INTO challenge20 (string, integer, float, date, boolean)
VALUES ('koma', 142, 42.1, '21/11/2018', 'false');