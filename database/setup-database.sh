eval `docker-machine env dimtec`

function createDockerVolume {
  cmd=$(docker volume ls -q | grep $1)
  if [[ "$cmd" == $1 ]];
  then
    echo 'volume available'
  else
    cmd='docker volume create --name '$1
    eval $cmd
  fi
}

function creataDatabaseServer {
  # starts the mongodb container
  docker run \
  --restart=unless-stopped \
  --name $1 \
  --hostname $1 \
  -v $2:/data \
  -p 27017:27017 \
  -d mongo --smallfiles \
  --storageEngine wiredTiger
}

function createDBUserAdmin {
  # for mongo server security and restriction access
  docker exec -i $1 mongo admin --eval "db.createUser({ user: 'cristian', pwd: 'admin1', roles: [ { role: 'userAdminAnyDatabase', db: 'admin' } ] })"
  # for database security and restriction access
  docker exec -i $1 mongo admin -u cristian -p admin1 --eval "db.createUser({ user: 'cris', pwd: 'bookstorepass1', roles: [ { role: 'dbOwner', db: 'bookstore' } ] })"
}

function setupDefaultData {
  docker exec -i $1 mongoimport --db $2 --collection books --file ./collection/books.json -u cris -p bookstorepass1 --authenticationDatabase=admin
  docker exec -i $1 mongoimport --db $2 --collection authors --file ./collection/authors.json -u cris -p bookstorepass1 --authenticationDatabase=admin
  docker exec -i $1 mongoimport --db $2 --collection category --file ./collection/category.json -u cris -p bookstorepass1 --authenticationDatabase=admin
  docker exec -i $1 mongoimport --db $2 --collection publisher --file ./collection/publisher.json -u cris -p bookstorepass1 --authenticationDatabase=admin
}


function reset {
  # remove if the container exists
  docker rm -f $1
  docker volume rm $(docker volume ls -qf dangling=true)
}

function main {
  reset mongoNode
  createDockerVolume mongoStorage
  creataDatabaseServer mongoNode mongoStorage
  createDBUserAdmin mongoNode
  setupDefaultData mongoNode bookstore
}

main
