CREATE TABLE ITEMS (
    id serial PRIMARY KEY,
    name VARCHAR ( 50 ) NOT NULL,
    price NUMERIC(11,2) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE USERS (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);