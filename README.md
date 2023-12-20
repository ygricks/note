## App
App for own notes in calendar, single user app BE API
- no tests in a while

## Installation

```bash
npm install
```

## Running the app

#### run database in container
```bash
docker compose up db -d
```
#### development
```bash
npm run start
```
#### watch mode
```bash
npm run start:dev
```
#### production mode
```bash
npm run start:prod
```

## Test

#### unit tests
```bash
npm run test
```
#### e2e tests
```bash
npm run test:e2e
```
#### test coverage
```bash
npm run test:cov
```

## Description
 - database: [postgres](https://www.postgresql.org/)
 - orm: [mikroorm](https://mikro-orm.io/)
 - rest-api: [nest](https://nestjs.com/)
 - test: [jest](https://jestjs.io/)
