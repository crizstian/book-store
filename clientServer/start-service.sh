docker run --name front-service --hostname frontend --link bookstore-service --env-file env -p 8080:3000 -d front-service
