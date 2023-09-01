## Description

This compoment supports the fantaformula1 game. These apis are written with the [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
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

## Use Docker

```bash
$ cd fantaformula1-utils

$ docker build -t fantaformula1-utils .

# select the port you prefer
$ docker run -d -p 3000:3000 fantaformula1-utils
```

if you use docker, you cannot use the rquest.http client for testing

## Usage

In order to get the driver of the day you can just call the api:

```
GET http://localhost:3000/fantaformula1/driver-of-day/2023/13
```

If the race you selected is not yet completed you will get an error. At the moment only data from the 2023 ahead are supported.
