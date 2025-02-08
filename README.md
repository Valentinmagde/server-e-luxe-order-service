# User Service API
As the title suggests, This service will demonstrate the user related APIs.

## Requirements
1. [Redis](https://redis.io/docs/getting-started/installation/)
2. [NodeJS](https://nodejs.org/en)
## Install dependencies
You have to use the following command to install dependencies:
```
npm install
```
## Environment Variables
To create env file you have to use the following command:
```
cp .env.example .env
```
## Build for local development
You have to use the following command to start a development server:
```
npm start
```
See package.json for more details.
## Build for staging and production environments
Use following command to build project:
```
npm run build
```
Use following command to start project on staging and production environments:
```
npm start
```
See package.json for more details.
## Private and Private key
Because we are going to use JSON Web Tokens to exchange data about authorized users between services, we need a pair of private and public keys. To generate them with OpenSSL, we execute the following commands in the project root directory.

>Note to Windows users: If we have installed Git, we can find the openssl.exe executable in the C:\Program Files\Git\usr\bin directory. Note that this directory may not be included in our path, so we'll need to add it to the command-line instruction.

```
openssl genrsa -out ./auth/private.key 2048
openssl rsa -pubout -in ./auth/private.key -out ./public.key
```
## Tests
Following tests libraries are used for unit/integration tests:
1. [Jest](https://jestjs.io/docs/getting-started)
2. [Supertest]()

Tests are kept next to source with following pattern *.spec.js

Use following command to run tests:
```
npm test
```
Use following command to run tests coverage:
```
npm run coverage
```
## Docker container
There is available Docker container and Docker Composer if you would like to run many NodeJS Microservices.

Build API Microservice by using following command:
```
npm run build
```
Then use following command to build Docker containers:
```
docker-compose up -d --build
```
See Dockerfile and docker-compose.yml for more details.
