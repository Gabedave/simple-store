# Simple Store

## Description

Simple store is a simple store application that allows you to manage your products and orders.

## Technologies Used
- Nestjs
- Typescript
- MongoDb
- Jest

## Installation
**!Important**: Add env variable to file `.env` using to format provided in [`./.env.example`](./.env.example) 

```bash
$ npm install
$ npm run start
```

### Docker
Or use the docker alternative
```bash
$ docker build -t simple-store .
$ docker run --rm -p 3000:3000 simple-store
```

## Seeding the database
Run the following commands in the project root directory to seed each table
```bash
$ npx nestjs-command seed:user
$ npx nestjs-command seed:products
$ npx nestjs-command seed:orders
```
or Run the following command to seed all tables
```bash
$ npx nestjs-command seed:all
```

## Tests
Comprehensive tests are written using [Jest](https://jestjs.io/docs/getting-started) especially for the Orders Module. Run all tests using
```bash
$ npm run test
```

## Usage
The store api can be consumed by the following endpoints. All endpoints except login and signup are protected using jwt authentication (Bearer token). Token is returned on signup or login.

This api performs the following features
- Signup (`email`, `password`, `name`)
- Login (`email` and `password`)
- JWT Authentication
- Create, Update, Delete and Get all products
- Create orders for user
- Update order status `pending`, `processing`, `shipped`, `delivered`, `cancelled`

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

Refer to the [postman documentation](https://api.postman.com/collections/18551524-05246fd6-1668-47e0-a242-ed11cd91d34a?access_key=PMAT-01HGREF727XP9YSGFVQ63MQJYD) for full API documentation or access the swagger docs on [http://localhost:3000/api](http://localhost:3000/api/)

## Next Steps
- Create user types like admin, customer and equivalent authorizations
- Automatic deduction of product count when an order is placed and reverting when order is cancelled

## License

This project is licenced under [MIT licensed](LICENSE).
