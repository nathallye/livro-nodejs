#!/bin/bash
case "$(uname -s)" in
  Darwin)
    echo "OS X"
    OS="darwin"
  ;;
  Linux)
    echo "Linux"
    OS="linux"
  ;;
  *)
    echo "Unsupported OS"
    exit 1
esac
case "$1" in # $1 para lermos argumentos informados na chamada do arquivo scripts(./scripts dev, ./scripts test) 
  dev)
    export DEBUG=livro_nodejs:*
    nodemon server/bin/www
  ;;
  test)
    export NODE_OPTIONS=--experimental-vm-modules
    jest server/**/*.test.js tests/**/*.test.js --coverage --forceExit --detectOpenHandles
  ;;
  build)
    echo "Building..."
    rm -rf node_modules dist
    mkdir -p dist/
    npm install
  ;;
  *)
    echo "Usage: {dev|test|build}"
    exit 1
  ;;
esac

# Para liberamos permissão de execução desse arquivo, devemos rodar no terminal o comando:
# chmod +x scripts.sh