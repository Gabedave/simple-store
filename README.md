# Simple Store

## Description

Simple store is a simple store application that allows you to manage your products and orders.

## Technologies Used
- Nestjs
- MongoDb

## Installation

```bash
$ npm install
$ npm run start
```

## Seeding the database
Run the following commands to seed each table
```bash
$ npx nestjs-command seed:user
$ npx nestjs-command seed:products
$ npx nestjs-command seed:orders
```
or Run the following command to seed all tables
```bash
$ npx nestjs-command seed:all
```

## Usage
The store api can be consumed by the following endpoints. All endpoints except login and signup are protected using jwt authentication (Bearer token)

### Authentication

- POST /auth/login
- POST /auth/signup
- GET /auth/me

### Products

- GET /products
- GET /products/:id
- DELETE /products/:id

### Orders

- GET /orders
- POST /orders
- GET /orders/:id
- PATCH /orders/:id
- DELETE /orders/:id

Refer to the postman documentation for full API documentation

## License

Nest is [MIT licensed](LICENSE).
