NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m
PWD=$(shell pwd)
MODULES=${PWD}/node_modules/
BIN=${MODULES}.bin/

.PHONY: dist
dist:
	@echo "$(OK_COLOR)Build dist package$(NO_COLOR)"
	@rm -rf dist && mkdir dist && cp favicons/* dist/ && NODE_ENV=production webpack -p


.PHONY: lint
lint:
	@echo "$(OK_COLOR)Run lint in quiet mode$(NO_COLOR)"
	@node_modules/.bin/eslint app/ --quiet
	@echo "$(OK_COLOR)No lint errors$(NO_COLOR)"


.PHONY: test
test:
	@echo "$(OK_COLOR)Run unit tests$(NO_COLOR)"
	@${BIN}mocha --require pretest.js -R spec "app/**/*.t.js"


.PHONY: coverage
coverage: 
	(cd app && ../node_modules/babel-istanbul/lib/cli.js --include-all-sources --babel-stage=0 \
		cover ../node_modules/mocha/bin/_mocha -- -t 5000 -R spec "./**/*.t.js")


.PHONY: travis-build
travis-build:
	@echo "$(OK_COLOR)Run travis build$(NO_COLOR)"
	make lint
	(cd app && ../node_modules/babel-istanbul/lib/cli.js --include-all-sources --babel-stage=0 cover\
	 ../node_modules/mocha/bin/_mocha --report lcovonly -- -t 5000 -R spec "./**/*.t.js" && \
	 cat ./coverage/coverage.json | ../node_modules/codecov.io/bin/codecov.io.js)


# check 4444 for running webdriver
.PHONY: e2e
e2e:
	@echo "$(OK_COLOR)Run end to end tests$(NO_COLOR)"
	@${BIN}protractor protractor.js


.PHONY: e2e-server
e2e-server:
	@echo "$(OK_COLOR)Run webdriver server$(NO_COLOR)"
	@${BIN}webdriver-manager start


.PHONY: e2e-update-server
e2e-update-server:
	@echo "$(OK_COLOR)Update webdriver$(NO_COLOR)"
	@${BIN}webdriver-manager update --standalone


.PHONY: dev-server
dev-server:
	@echo "$(OK_COLOR)Run webpack developer server$(NO_COLOR)"
	@${BIN}webpack-dev-server --devtool eval --progress --colors --hot --content-base build/ --inline