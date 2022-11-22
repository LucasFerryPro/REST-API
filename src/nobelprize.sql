DROP TABLE IF EXISTS Prizes;
DROP TABLE IF EXISTS Laureates;
DROP TABLE IF EXISTS Categories;



CREATE TABLE Laureates
(
    id_laureate SERIAL
        CONSTRAINT pk_laureate PRIMARY KEY,
    firstname   VARCHAR(20),
    surname     VARCHAR(20)
);

CREATE TABLE Categories
(
    id_categorie SERIAL
        CONSTRAINT pk_categorie PRIMARY KEY,
    label        VARCHAR(50) NOT NULL
);

CREATE TABLE Prizes
(
    id_laureate  INT NOT NULL PRIMARY KEY REFERENCES Laureates (id_laureate),
    id_categorie INT NOT NULL PRIMARY KEY REFERENCES Categories (id_categorie),
    year         INT NOT NULL PRIMARY KEY,
    motivation   VARCHAR(100)

);