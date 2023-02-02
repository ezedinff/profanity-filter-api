#!/bin/bash

inputFile=$1
outputFile=$2

container_id=$(docker ps -aq --filter name=monkeyplug)
if [ ! -z "$container_id" ]; then
  echo "Deleting existing container with ID $container_id"
  docker rm -f $container_id
fi

docker run -i --name monkeyplug -v $(pwd)/upload:/app/upload monkeyplug --input /app/${inputFile} --output /app/${outputFile} --force true
