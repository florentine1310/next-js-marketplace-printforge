## Marketplace for 3D Print Models

This is a [Next.js](https://nextjs.org) project done as final project for the UpLeveled Full Stack Development Course.

## Technologies

- Next.js
- Tailwind CSS
- DaisyUI
- PostgreSQL

## Database Setup

```
postgres=# CREATE DATABASE marketplace_printforge;
CREATE DATABASE
postgres=# CREATE USER marketplace_printforge WITH ENCRYPTED PASSWORD 'marketplace_printforge';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE marketplace_printforge TO marketplace_printforge;
GRANT
postgres=# \connect marketplace_printforge
Sie sind jetzt verbunden mit der Datenbank »marketplace_printforge« als Benutzer »FlorentineRamboeck«.
marketplace_printforge=# CREATE SCHEMA marketplace_printforge AUTHORIZATION marketplace_printforge;
CREATE SCHEMA
marketplace_printforge=# \q
```

## Tests

## Deployment

## Authentication

Some pages are protected with sessions and can only be accessed by authenticated users. User needs to login with username and password to be authenticated. Authenticated users can access the protected pages and perform CRUD operations on the models.

```ts
export type User = {
  id: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  zip_code: number;
  city: string;
  country: string;
  profile_image: string;
  password_hash: string;
  offers_printing: boolean;
  created_at: Date;
};
```

```ts
- /api/(auth)/register
  - POST   => User   | Error[]   (create user)

- /api/(auth)/login
  - POST   => User   | Error[]   (login user)
```
