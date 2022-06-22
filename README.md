# Postal Code Service
## Description

Service to get a list of provinces, cities, districts, villages and postal codes of Indonesia


## Project Dependencies
1. Node version **>= v14**
2. PostgreSQL version **>= 14**


## Installation

```bash
$ npm install

# After run the command above please make sure to change .env file
```

## Running the migration

```bash
# To make sure migration files are on the dist folder
$ npm run build

$ npm run migration:run
```

## Running the seed

```bash
$ npm run seed
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with Docker Compose

```bash
# Make sure to change DATABASE_HOST value on .env file to postgres

$ docker-compose up -d -V --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

API documented using swagger and can be accessed at path [/docs](http://localhost:3000/docs)
