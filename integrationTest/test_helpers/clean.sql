ALTER TABLE IF EXISTS CARTS 
  DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE IF EXISTS CARTS 
  DROP CONSTRAINT IF EXISTS fk_item;

DROP TABLE IF EXISTS CARTS;
DROP TABLE IF EXISTS USERS CASCADE;
DROP TABLE IF EXISTS ITEMS CASCADE;

CREATE TABLE ITEMS (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
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

CREATE TABLE CARTS (
    id serial PRIMARY KEY,
    "userId" BIGINT NOT NULL,
    "itemId" BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY("userId") 
	  REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_item
      FOREIGN KEY("itemId") 
	  REFERENCES items(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- INSERT INTO ITEMS(name, price, "createdAt", "updatedAt") VALUES ('apple', 3, current_timestamp, current_timestamp);
-- INSERT INTO ITEMS(name, price, "createdAt", "updatedAt") VALUES ('banana', 1, current_timestamp, current_timestamp);
-- INSERT INTO ITEMS(name, price, "createdAt", "updatedAt") VALUES ('mango', 2, current_timestamp, current_timestamp);

-- INSERT INTO USERS(name, address, "createdAt", "updatedAt") VALUES ('David', '1 First Street', current_timestamp, current_timestamp);
-- INSERT INTO USERS(name, address, "createdAt", "updatedAt") VALUES ('Romil', '2 Second Street', current_timestamp, current_timestamp);