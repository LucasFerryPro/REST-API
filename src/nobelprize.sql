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
    id_laureate  INT NOT NULL,
    id_categorie INT NOT NULL,
    year         INT NOT NULL,
    motivation   VARCHAR(100),
    CONSTRAINT pk_prize PRIMARY KEY (id_laureate, id_categorie, year),
    CONSTRAINT fk_prize_laureate FOREIGN KEY (id_laureate) REFERENCES Laureates (id_laureate),
    CONSTRAINT fk_prize_categorie FOREIGN KEY (id_categorie) REFERENCES Categories (id_categorie)
);