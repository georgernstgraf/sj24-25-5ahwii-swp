CREATE TABLE Mensch (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_mutter INTEGER NOT NULL,
    id_vater INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (id_mutter) REFERENCES Mensch (id),
    FOREIGN KEY (id_vater) REFERENCES Mensch (id),
    CHECK (
        CASE
            WHEN id < 4 THEN id_mutter = 1
            AND id_vater = 1
            ELSE id_mutter != id
            AND id_vater != id
            AND id_mutter != id_vater
        END
    )
);