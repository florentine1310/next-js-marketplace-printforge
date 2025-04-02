## Marketplace for 3D Print Models

This is a [Next.js](https://nextjs.org) project done as final project for the UpLeveled Full Stack Development Course.
It is a full functioning marketplace application that includes the following functionlities: 

- Login / Registering with Authentication and Zod Validation
- 3D Printing Models Upload and Editing
- Add-To-Cart / Add-To-Wishlist
- Shopping Cart
- Checkout with Stripe Payments

 <img width="1392" alt="image" src="https://github.com/user-attachments/assets/0d3a6f57-a69c-40f9-b26a-b08144582715" />

<img width="1400" alt="image" src="https://github.com/user-attachments/assets/df6529a0-cd49-4703-80eb-08e952a63227" />


## Technologies

- Next.js
- Tailwind CSS
- DaisyUI
- PostgreSQL
- Zod
- Jest
- Playwright
- Cloudinary API & Upload Widget 
- Stripe API 

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

### Jest
``
pnpm jest
``

### Playwright
``
pnpm playwright test
``

## Deployment

The project is deployed to Fly.io 

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

## Stripe Checkout 

the checkout can be tested with Stripe test card credentials: https://docs.stripe.com/testing
