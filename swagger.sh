#!/bin/sh
echo Updating app/lib/swagger.json from $1
./node_modules/.bin/fetch-swagger-schema $1 app/lib/swagger.json
