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
