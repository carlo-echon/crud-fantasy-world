CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255)
);

CREATE TABLE people (
    characterid SERIAL PRIMARY KEY,
    characterName VARCHAR(255),
    characterSpecies VARCHAR(255),
    characterAlignment VARCHAR(255),
    characterStanding VARCHAR(255),
    characterGoals VARCHAR(255)
);

CREATE TABLE magicitems (
    magicitemid SERIAL PRIMARY KEY,
    magicitemName VARCHAR(255),
    magicitemType VARCHAR(255),
    magicitemDescription VARCHAR(255)
);

CREATE TABLE locations (
    locationsid SERIAL PRIMARY KEY,
    locationsName VARCHAR(255),
    locationsClimate VARCHAR(255),
    locationsDescription VARCHAR(255)
);

create TABLE history (
    historyid SERIAL PRIMARY KEY,
    historyDate VARCHAR(255),
    historyEvent VARCHAR(255),
    historyDescription TEXT
);

CREATE TABLE character_locations (
    characterid INT,
    locationsid INT,
    PRIMARY KEY (characterid, locationsid),
    CONSTRAINT fk_character
        FOREIGN KEY (characterid)
        REFERENCES people(characterid)
        ON DELETE CASCADE,
    CONSTRAINT fk_location
        FOREIGN KEY (locationsid)
        REFERENCES locations(locationsid)
        ON DELETE CASCADE
);

