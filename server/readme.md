## Bookstore server side example with NodeJS

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Stack
- NodeJS 7.7.0
- MongoDB 3.4.2

### How to run the test locally
To test all the spec files, we need to use the `mocha` library and in our package json file we include a test
script with the following `mocha -R spec **/*.spec.js` this will look up in all the project and execute all the
tests, and finally we can execute the following command.

`$ npm test`

What is testing ?

- database connection
- dependency injection
- schemas validation
- repository functions (testing with the async/await specification)
- api endpoints
- basic authentication user process

### How to run it locally
To run it locally we need to execute the following command:

`$ npm start`

and it will start the server at `https://localhost:3000`

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
