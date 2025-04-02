-- Creating user table
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  address varchar NOT NULL,
  zip_code bigint NOT NULL,
  city varchar(50) NOT NULL,
  country varchar(50) NOT NULL,
  profile_image url,
  password_hash varchar NOT NULL,
  offers_printing boolean NOT NULL,
  created_at date NOT NULL
)
-- Inserting into Users table
INSERT INTO
  users (
    id,
    user_name,
    email,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    profile_image,
    password_hash,
    offers_printing,
    created_at
  )
VALUES
  (
    'sampleUser',
    'test.user@email.at',
    'Test',
    'User',
    'Some Street 24',
    '1234',
    'Vienna',
    'Austria',
    'sample.url',
    TRUE,
    current_date
  )
  -- Selecting data from users table
SELECT
  *
FROM
  users;
