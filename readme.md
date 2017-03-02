# Book Store example with the MEAN Stack

### How to run the Book Store system

### Stack
- NodeJS 7.7.0 (installed for local testing only)
- MongoDB 3.4.2
- Angular 2.4 with CLI
- Docker 1.13.1 [For Mac/For Windows/ Linux engine] (installed)

### Run Command

`$ bash < kraken.sh`

### Description

the kraken will setup everything automatically for us so it will to put our system up and running, the kraken file is composed by the following functions:

- **createDockerMachine**: This function will create a `docker-machine` with a virtualbox driver with its defualts settings for local testing purposes.

- **createDatabase**: This function will call the `setup-database.sh` file, this file automates the creation of a database, creation of users for security and it will start a mongoDB container to have a database up and running.

- **createBackendServer**: This function will create an image and start a backend service called bookstore, where is going to serve an API, so can a frontend service can consume it. It handles all the CRUD operations for books, authors, and related stuff.

- **buildAngularApp**: This function will compile the angular store web app using the `angular-cli` into production mode and move the files to the createClientServer folder to be able to deploy the app into a web server.

- **createClientServer**: The last function will create an image and start a frontend-service, that basically deploys the angular store web app into an express server configured with the http/2 protocol.

## Use the Book Store System
- **Web App**
To use the web app we need to visit the following url `https://192.168.99.100:8080` in a chrome browser for better experience, the browser will ask us if we want to trust the certificate and we need trust it, this happens because we are using self-signed certificates.

- **Book Service API**
The web app will make use of the API calling the following url: `https://192.168.99.100:3000` and here the will the dispatch all the requests need it for, searching, creating, editing, deleting a book, as well as the author.

- **MongoDB Database**
To make use of the database the book service api calls the following ip server: `192.168.99.100:27017`, but to be able to perform the database operations we need to be authenticated.


### Snapshot

![](./Snapshots.png)

![](./Snapshots2.png)
