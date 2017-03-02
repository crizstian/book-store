function createDockerMachine {
  docker-machine create -d virtualbox dimtec
}

function createDatabase {
  cd database
  (bash < setup-database.sh)
  cd ..
}

function createBackendServer {
  cd server
  (bash < create-image.sh)
  (bash < start-service.sh)
  cd ..
}

function buildAngularApp {
  cd client

  rm -rf dist/

  (npm run build)

  mv dist/ ../clientServer/src/server

  cd ..
}


function createClientServer {
  cd clientServer

  (bash < create-image.sh)
  (bash < start-service.sh)

  cd ..
}

function main {
  eval `docker-machine env dimtec`
  createDockerMachine
  createDatabase
  createBackendServer
  buildAngularApp
  createClientServer
}

main
