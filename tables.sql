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

CREATE TABLE CART (
    id serial PRIMARY KEY,
    userid INTEGER NOT NULL,
    itemid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(userid) 
	  REFERENCES users(id),
    CONSTRAINT fk_item
      FOREIGN KEY(itemid) 
	  REFERENCES items(id)
);