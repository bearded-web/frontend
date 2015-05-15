NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m
PWD=$(shell pwd)
MODULES=${PWD}/node_modules/
BIN=${MODULES}.bin/

run:
	@make lint
	@make test
	@make dist

# Build production ready statics to dist/
.PHONY: dist
dist:
	@echo "$(OK_COLOR)Build dist package$(NO_COLOR)"
	@rm -rf dist && mkdir dist && cp favicons/* dist/ && NODE_ENV=production webpack -p
	@echo "$(WARN_COLOR)Are you build swagger.json before build dist?$(NO_COLOR)"

# Build release ZIP file with statics
.PHONY: release
release:
	@echo "$(OK_COLOR)Build release package$(NO_COLOR)"
	rm -rf dist
	mkdir dist
	cp favicons/* dist/
	NODE_ENV=production webpack -p
	zip -r bearded_fronted dist/

# Build api description from backend to app/lib/swagge.json.
# This file should be builded every time server API changed.
# Also is good to build it before "make dist".
.PHONY: swagger.json
swagger.json:
	LINK=http://localhost:3003/apidocs.json
	@echo "$(OK_COLOR)Updating app/lib/swagger.json from ${LINK}$(NO_COLOR)"
	@${BIN}fetch-swagger-schema ${LINK} app/lib/swagger.json

# Start code linting, show only errors
.PHONY: lint
lint:
	@echo "$(OK_COLOR)Run lint in quiet mode$(NO_COLOR)"
	@node_modules/.bin/eslint app/ --quiet
	@echo "$(OK_COLOR)No lint errors$(NO_COLOR)"

# Start unit testing
.PHONY: test
test:
	@echo "$(OK_COLOR)Run unit tests$(NO_COLOR)"
	@${BIN}mocha --require pretest.js -R spec "app/**/*.t.js"

# Build coverage into app/coverage
.PHONY: coverage
coverage:
	@echo "$(OK_COLOR)Run unit tests with coverage$(NO_COLOR)"
	@(cd app && ../node_modules/babel-istanbul/lib/cli.js --include-all-sources --babel-stage=0 \
		cover ../node_modules/mocha/bin/_mocha -- --require ../precoverage.js -t 5000 -R spec "./**/*.t.js")

# Task for travis.ci automatic tests
# Should not been called manual
.PHONY: travis-build
travis-build:
	@echo "$(OK_COLOR)Run travis build$(NO_COLOR)"
	make lint
	@echo "$(OK_COLOR)Run tests + coverage$(NO_COLOR)"
	(cd app && ../node_modules/babel-istanbul/lib/cli.js --include-all-sources --babel-stage=0 cover\
	 ../node_modules/mocha/bin/_mocha --report lcovonly -- --require ../precoverage.js -t 10000 -R spec "./**/*.t.js")
	@echo "$(OK_COLOR)Upload coverage to codecov.io$(NO_COLOR)"
	cat app/coverage/lcov.info | ./node_modules/codecov.io/bin/codecov.io.js

# Install project dependencies
.PHONY: deps
deps:
	@echo "$(OK_COLOR)Install dependencies$(NO_COLOR)"
	@npm install


# Start protractor e2e testingg
# Require webdriver-manager to be started (make e2e-server)
.PHONY: e2e
e2e:
	@echo "$(OK_COLOR)Run end to end tests$(NO_COLOR)"
	@${BIN}protractor protractor.js

# Start wselenium server for e2e testing
.PHONY: e2e-server
e2e-server:
	@echo "$(OK_COLOR)Run webdriver server$(NO_COLOR)"
	@${BIN}webdriver-manager start

# Update webrdiver
.PHONY: e2e-update-server
e2e-update-server:
	@echo "$(OK_COLOR)Update webdriver$(NO_COLOR)"
	@${BIN}webdriver-manager update --standalone

# Start webpack developer server
.PHONY: dev-server
dev-server:
	@echo "$(OK_COLOR)Run webpack developer server$(NO_COLOR)"
	@${BIN}webpack-dev-server --devtool eval --progress --colors --hot --content-base build/ --inline
