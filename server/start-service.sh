docker run --name bookstore-service --hostname backend --link mongoNode --env-file env -p 3000:3000 -d bookstore-service
