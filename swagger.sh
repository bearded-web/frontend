#!/bin/sh

defaultLink=http://localhost:3003/apidocs.json

link=${1:-$defaultLink}

echo Updating app/lib/swagger.json from $link
./node_modules/.bin/fetch-swagger-schema $link app/lib/swagger.json
