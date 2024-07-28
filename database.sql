CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE people (
    characterid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    species VARCHAR(255),
    alignment VARCHAR(255),
    standing VARCHAR(255),
    goals VARCHAR(255)
);

CREATE TABLE magicitems (
    magicitemid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE locations (
    locationsid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    climate VARCHAR(255),
    description VARCHAR(255)
);

create TABLE history (
    historyid SERIAL PRIMARY KEY,
    date VARCHAR(255),
    event VARCHAR(255),
    description TEXT
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

