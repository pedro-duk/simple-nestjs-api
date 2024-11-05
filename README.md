## General Info

- <b> Objective: </b> Development of a Nest.JS API for a quick reference when building future projects and to showcase some useful Nest features.

## Features

- Custom Injectable Validators using the [class-validator package](https://github.com/typestack/class-validator);
  - Able to do complex logic such as querying the database;
  - Injected directly into the Data-Transfer object, providing readability and reusability.
- Automated tests in Jest;

  - E2E tests (DONE);
  - Unit tests (TO-DO);

- Usage of [Nest's SwaggerModule](https://docs.nestjs.com/openapi/introduction) to automatically generate OpenAPI documentation.
- Usage of [Nest-Provided Testing Modules](https://docs.nestjs.com/fundamentals/testing);
- Usage of [MongoDB Memory Server Package](https://github.com/typegoose/mongodb-memory-server) to create a MongoDB server in-memory for testing;

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
