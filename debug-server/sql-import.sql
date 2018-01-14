CREATE TABLE users(
    userid int PRIMARY KEY, 
    fname VARCHAR, 
    lname VARCHAR
);

CREATE TABLE transactions(
    tid int PRIMARY KEY,
    userid int REFERENCES users(userid),
    item VARCHAR,
    price REAL,
    location VARCHAR
);

.mode csv
.import users.csv users
.import transactions.csv transactions

