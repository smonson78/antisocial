DROP DATABASE IF EXISTS antisocial;
CREATE DATABASE antisocial;

CREATE TABLE antisocial.users (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  guest BOOLEAN DEFAULT false,
  name VARCHAR(50),
  password VARCHAR(80),
  salt VARCHAR(64),

  email VARCHAR(128),
  phone VARCHAR(32),

  createdDate DATETIME DEFAULT now(),

  INDEX (ID),
  INDEX (guest),
  INDEX (name)
);

CREATE TABLE antisocial.sessions (
  ID CHAR(32) PRIMARY KEY,
  created DATETIME,
  userID INT,

  INDEX (ID),
  INDEX (userID),
  FOREIGN KEY (userID) REFERENCES antisocial.users(ID)
);

CREATE TABLE antisocial.permissions (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  type VARCHAR(25),

  FOREIGN KEY (userID) REFERENCES antisocial.users(ID)
);

CREATE TABLE antisocial.config (
  ID INT UNIQUE NOT NULL AUTO_INCREMENT,
  name VARCHAR(64),
  value VARCHAR(128),

  INDEX (ID),
  INDEX (name),
  PRIMARY KEY (ID)
);

CREATE TABLE antisocial.changelog (
  ID INT UNIQUE NOT NULL,
  status VARCHAR(16),

  INDEX(ID),
  PRIMARY KEY (ID)
);

-- test users
INSERT INTO antisocial.users (ID, name, password, salt) VALUES (1, 'simon',
  sha2(concat('smonson', 'vesdfes'), 256), 'vesdfes');
INSERT INTO antisocial.permissions(userID, type) VALUES (2, 'ADMIN');
