DROP TABLE IF EXISTS Nominations;
DROP TABLE IF EXISTS Laureates;
DROP TABLE IF EXISTS Prizes;
DROP TABLE IF EXISTS Categories;


CREATE TABLE Categories
(
    id_categorie SERIAL
        CONSTRAINT pk_categorie PRIMARY KEY,
    label        VARCHAR(100) NOT NULL
);

CREATE TABLE Prizes
(
    id_prize     SERIAL
        CONSTRAINT pk_prize PRIMARY KEY,
    id_categorie INT NOT NULL,
    year         INT NOT NULL,
    CONSTRAINT fk_prize_categorie FOREIGN KEY (id_categorie) REFERENCES Categories (id_categorie)
);

CREATE TABLE Laureates
(
    id_laureate SERIAL
        CONSTRAINT pk_laureate PRIMARY KEY,
    id_prize    INT NOT NULL,
    firstname   VARCHAR(200),
    surname     VARCHAR(200),
    CONSTRAINT fk_laureate_prize FOREIGN KEY (id_prize) REFERENCES Prizes (id_prize)
);

CREATE TABLE Nominations
(
    id_nomination SERIAL
        CONSTRAINT pk_nomination PRIMARY KEY,
    id_prize      INT NOT NULL,
    id_laureate   INT NOT NULL,
    motivation    VARCHAR(1000),
    CONSTRAINT fk_nomination_prize FOREIGN KEY (id_prize) REFERENCES Prizes (id_prize),
    CONSTRAINT fk_nomination_laureate FOREIGN KEY (id_laureate) REFERENCES Laureates (id_laureate)
);
