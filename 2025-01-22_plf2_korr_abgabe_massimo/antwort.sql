Aufgabe 1)

SELECT 
    id, 
    movie,
    description , 
    rating
FROM 
    cinema
WHERE 
    id % 2 = 1 
    AND description NOT LIKE '%langweilig%' 
ORDER BY 
    rating DESC; 



Aufgabe 2)









Aufgabe 3)

SELECT 
    Person.firstName, 
    Person.lastName, 
    Address.city, 
    Address.state
FROM 
    Person  
LEFT JOIN 
    Address 
ON 
    Person.personId = Address.personId;



Aufgabe 4)

CREATE TABLE Mensch (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_mutter INTEGER NOT NULL,
    id_vater INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (id_mutter) REFERENCES Mensch (id),
    FOREIGN KEY (id_vater) REFERENCES Mensch (id),
    CHECK (id_mutter != id AND id_vater != id), 
    CHECK (id_mutter != id_vater) 
);

INSERT INTO Mensch (id, id_mutter, id_vater, name) VALUES (1, 0, 0, "Gott");
INSERT INTO Mensch (id, id_mutter, id_vater, name) VALUES (2, 1, 1, "Eva");
INSERT INTO Mensch (id, id_mutter, id_vater, name) VALUES (3, 1, 1, "Adam");
