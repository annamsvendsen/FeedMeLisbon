CREATE TABLE Restaurant (
    RestaurantID INT NOT NULL AUTO_INCREMENT, 
    Name VARCHAR(30),
    Location VARCHAR(50),
    Type VARCHAR(30),
    PRIMARY KEY (RestaurantID)
);
 
INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Dear Breakfast", "Calçada de São Francisco 35", "Breakfast");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Hard Rock Cafe", "Av. da Liberdade 2", "Dinner");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Rice me deli", "Av. António Augusto de Aguiar 124 A", "Breakfast");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Grom", "R.Garrett 42", "Dessert");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Mano a mano", "R.do Alecrim 22", "Dinner");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Gelataria Scoop Gelato", "Lgo da Princesa 26A", "Dessert");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Artigiano Ristorante Pizzeria", "Av. Alm. Reis 59 B", "Dinner");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Sala de Corte", "Praça Dom Luís I 7", "Dinner");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Trinca", "Rua dos Anjos 59C", "Lunch");

INSERT INTO Restaurant (Name, Location, Type) 
    VALUES ("Lisbon Sekuwa Corner", "R. Andrade 26", "Lunch");


CREATE TABLE Rating (
    RatingID INT NOT NULL AUTO_INCREMENT, 
    RatingValue INT,
    RestaurantID INT,
    PRIMARY KEY (RatingID), 
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(1, 10, 1);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(2, 5, 1);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(3, 2, 1);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(4, 4, 1);
    
INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(5, 6, 2);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(6, 5, 2);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(7, 8, 2);

INSERT INTO Rating(RatingID, RatingValue, RestaurantID)
    VALUES(8, 1, 2);