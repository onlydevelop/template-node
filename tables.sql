CREATE TABLE ITEMS (
    id serial PRIMARY KEY,
    name VARCHAR ( 50 ) NOT NULL,
    price VARCHAR ( 50 ) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);